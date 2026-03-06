'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import { subjectsApi, Subject } from '@/lib/subjects';
import { BookOpen, LogOut, User, PlayCircle, Video, Lock, Award, Users, Star, ArrowRight, CheckCircle } from 'lucide-react';

export default function HomePage() {
  const router = useRouter();
  const { isAuthenticated, user, logout } = useAuthStore();
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadSubjects = async () => {
      try {
        const data = await subjectsApi.getAll();
        setSubjects(data);
      } catch (error) {
        console.error('Failed to load subjects:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSubjects();
  }, []);

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-2.5 rounded-xl shadow-lg">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                LMS Platform
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <>
                  <Link
                    href="/subjects"
                    className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                  >
                    My Courses
                  </Link>
                  <div className="flex items-center space-x-2">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <User className="w-5 h-5 text-blue-600" />
                    </div>
                    <span className="font-medium text-gray-700">{user?.name}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2 rounded-lg font-medium transition-all"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    className="text-gray-700 hover:text-blue-600 font-medium transition-colors px-4 py-2"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/auth/register"
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200"
                  >
                    Get Started Free
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      {!isAuthenticated && (
        <section className="relative overflow-hidden py-20 lg:py-32">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-indigo-600/10"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <Star className="w-4 h-4" fill="currentColor" />
                <span>Premium Learning Platform</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-extrabold text-gray-900 mb-6 leading-tight">
                Master New Skills with
                <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Expert-Led Courses
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
                Access high-quality courses in AI, Machine Learning, Java, Python, and Data Science.
                Learn at your own pace with structured content and hands-on projects.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  href="/auth/register"
                  className="group bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-200 flex items-center space-x-2"
                >
                  <span>Start Learning Now</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="#courses"
                  className="bg-white text-gray-700 px-8 py-4 rounded-xl font-bold text-lg border-2 border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-200"
                >
                  Explore Courses
                </Link>
              </div>
              <div className="mt-12 flex items-center justify-center space-x-8 text-gray-500">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Free to start</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Lifetime access</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Certificate included</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      {!isAuthenticated && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Our Platform?</h2>
              <p className="text-xl text-gray-600">Everything you need to succeed in your learning journey</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl hover:shadow-xl transition-all duration-300">
                <div className="bg-blue-600 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                  <Video className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">HD Video Lessons</h3>
                <p className="text-gray-600">High-quality video content with clear explanations and practical examples.</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl hover:shadow-xl transition-all duration-300">
                <div className="bg-purple-600 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                  <Lock className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Structured Learning</h3>
                <p className="text-gray-600">Progressive curriculum designed by industry experts for optimal learning.</p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl hover:shadow-xl transition-all duration-300">
                <div className="bg-green-600 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                  <Award className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Track Progress</h3>
                <p className="text-gray-600">Monitor your learning journey with detailed progress tracking and analytics.</p>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-red-50 p-8 rounded-2xl hover:shadow-xl transition-all duration-300">
                <div className="bg-orange-600 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                  <Users className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Expert Instructors</h3>
                <p className="text-gray-600">Learn from experienced professionals with real-world industry expertise.</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Courses Section */}
      <section id="courses" className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Explore Our Courses</h2>
            <p className="text-xl text-gray-600">Choose from our carefully curated selection of courses</p>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : subjects.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">No courses available yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
              {subjects.map((subject) => (
                <Link
                  key={subject.id}
                  href={`/subjects/${subject.id}`}
                  className="group block bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200"
                >
                  <div className="p-8">
                    <div className="flex items-start justify-between mb-4">
                      <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white w-14 h-14 rounded-xl flex items-center justify-center text-2xl font-bold shadow-lg">
                        {subject.title.charAt(0)}
                      </div>
                      <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                        Available
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {subject.title}
                    </h3>
                    
                    {subject.description && (
                      <p className="text-gray-600 mb-6 line-clamp-2">{subject.description}</p>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-blue-600 font-semibold group-hover:translate-x-1 transition-transform">
                        <PlayCircle className="w-5 h-5 mr-2" />
                        <span>{isAuthenticated ? 'Continue Learning' : 'Enroll Now'}</span>
                      </div>
                      <svg 
                        className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                  <div className="h-1 bg-gradient-to-r from-blue-500 to-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-2 rounded-lg">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-gray-900">LMS Platform</span>
            </div>
            <p className="text-center text-gray-500 text-sm">
              © 2026 Learning Management System. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link href="#" className="text-gray-500 hover:text-blue-600 transition-colors">Privacy</Link>
              <Link href="#" className="text-gray-500 hover:text-blue-600 transition-colors">Terms</Link>
              <Link href="#" className="text-gray-500 hover:text-blue-600 transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
