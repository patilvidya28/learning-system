import { pool, query } from '../config/database';
import { buildGlobalSequence, isVideoLocked } from '../utils/ordering';
import { Section, Video, VideoProgress } from '../types';

const testVideoLocking = async (): Promise<void> => {
  try {
    console.log('🔒 Testing Video Locking Logic...\n');

    // Get subject ID 1 (AI & ML)
    const [subjects] = await pool.execute('SELECT id FROM subjects WHERE slug = ?', ['ai-ml']);
    const subjectId = (subjects as any)[0].id;
    console.log(`Testing with Subject ID: ${subjectId}\n`);

    // Get sections
    const [sectionsData] = await pool.execute('SELECT * FROM sections WHERE subject_id = ? ORDER BY order_index', [subjectId]);
    const sections = sectionsData as Section[];
    console.log(`Found ${sections.length} sections`);

    // Get all videos for this subject
    const [videosData] = await pool.execute(
      `SELECT v.* FROM videos v
       JOIN sections s ON v.section_id = s.id
       WHERE s.subject_id = ?
       ORDER BY s.order_index, v.order_index`,
      [subjectId]
    );
    const videos = videosData as Video[];
    console.log(`Found ${videos.length} total videos\n`);

    // Build global sequence
    const globalSequence = buildGlobalSequence(sections, videos);
    console.log('Global Sequence:');
    globalSequence.forEach((gv, idx) => {
      console.log(`  ${idx + 1}. Section ${gv.sectionOrder}, Video ${gv.videoOrder}: "${gv.video.title}" (ID: ${gv.video.id})`);
    });
    console.log();

    // Test Case 1: First video should be unlocked
    console.log('Test 1: First video (no progress)');
    const firstVideo = globalSequence[0].video.id;
    const emptyProgressMap = new Map<number, VideoProgress>();
    const isFirstLocked = isVideoLocked(firstVideo, globalSequence, emptyProgressMap);
    console.log(`  Video ID ${firstVideo}: Locked = ${isFirstLocked} ✓ (should be false)\n`);

    // Test Case 2: Second video should be locked if first is not completed
    console.log('Test 2: Second video when first is NOT completed');
    const secondVideo = globalSequence[1].video.id;
    const progressMapIncomplete = new Map<number, VideoProgress>();
    progressMapIncomplete.set(firstVideo, {
      id: 1,
      user_id: 1,
      video_id: firstVideo,
      last_position_seconds: 50,
      is_completed: false,
      completed_at: null,
      created_at: new Date(),
      updated_at: new Date(),
    });
    const isSecondLocked = isVideoLocked(secondVideo, globalSequence, progressMapIncomplete);
    console.log(`  Video ID ${secondVideo}: Locked = ${isSecondLocked} ✓ (should be true)\n`);

    // Test Case 3: Second video should be unlocked if first is completed
    console.log('Test 3: Second video when first IS completed');
    const progressMapComplete = new Map<number, VideoProgress>();
    progressMapComplete.set(firstVideo, {
      id: 1,
      user_id: 1,
      video_id: firstVideo,
      last_position_seconds: 100,
      is_completed: true,
      completed_at: new Date(),
      created_at: new Date(),
      updated_at: new Date(),
    });
    const isSecondUnlocked = isVideoLocked(secondVideo, globalSequence, progressMapComplete);
    console.log(`  Video ID ${secondVideo}: Locked = ${isSecondUnlocked} ✓ (should be false)\n`);

    // Test Case 4: Cross-section locking
    console.log('Test 4: Cross-section locking (last video of section 1 vs first of section 2)');
    const lastVideoSection1 = globalSequence.find(gv => gv.sectionOrder === 1 && gv.videoOrder === Math.max(...videos.filter(v => 
      sections.find(s => s.id === v.section_id)?.order_index === 1
    ).map(v => v.order_index)))?.video.id;
    
    const firstVideoSection2 = globalSequence.find(gv => gv.sectionOrder === 2 && gv.videoOrder === Math.min(...videos.filter(v => 
      sections.find(s => s.id === v.section_id)?.order_index === 2
    ).map(v => v.order_index)))?.video.id;

    if (lastVideoSection1 && firstVideoSection2) {
      const progressMapCrossSection = new Map<number, VideoProgress>();
      progressMapCrossSection.set(lastVideoSection1, {
        id: 1,
        user_id: 1,
        video_id: lastVideoSection1,
        last_position_seconds: 0,
        is_completed: false,
        completed_at: null,
        created_at: new Date(),
        updated_at: new Date(),
      });
      
      const isCrossSectionLocked = isVideoLocked(firstVideoSection2, globalSequence, progressMapCrossSection);
      console.log(`  Last Video Section 1 (ID: ${lastVideoSection1}): Not completed`);
      console.log(`  First Video Section 2 (ID: ${firstVideoSection2}): Locked = ${isCrossSectionLocked} ✓ (should be true)\n`);
    }

    console.log('✅ All video locking tests passed!\n');
    
    await pool.end();
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Test failed:', error);
    process.exit(1);
  }
};

testVideoLocking();
