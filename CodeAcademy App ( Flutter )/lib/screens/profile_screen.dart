import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class ProfileScreen extends StatelessWidget {
  const ProfileScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(
          'Profile',
          style: GoogleFonts.poppins(
            fontWeight: FontWeight.w600,
          ),
        ),
        actions: [
          IconButton(
            onPressed: () {
              // TODO: Implement settings
            },
            icon: const Icon(Icons.settings),
          ),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            const _ProfileHeader(),
            const SizedBox(height: 24),
            _buildSection(
              title: 'Progress',
              children: [
                _ProgressCard(
                  icon: Icons.code,
                  title: 'Completed Courses',
                  value: '12',
                ),
                _ProgressCard(
                  icon: Icons.assignment_turned_in,
                  title: 'Solved Problems',
                  value: '156',
                ),
                _ProgressCard(
                  icon: Icons.emoji_events,
                  title: 'Achievement Points',
                  value: '2,450',
                ),
              ],
            ),
            const SizedBox(height: 24),
            _buildSection(
              title: 'My Learning',
              children: [
                _LearningPathCard(
                  title: 'Flutter Development',
                  progress: 0.75,
                  lessonsCompleted: 15,
                  totalLessons: 20,
                ),
                _LearningPathCard(
                  title: 'Data Structures',
                  progress: 0.4,
                  lessonsCompleted: 8,
                  totalLessons: 20,
                ),
                _LearningPathCard(
                  title: 'Algorithms',
                  progress: 0.3,
                  lessonsCompleted: 6,
                  totalLessons: 20,
                ),
              ],
            ),
            const SizedBox(height: 24),
            _buildSection(
              title: 'Achievements',
              children: [
                _buildAchievement(
                  icon: Icons.star,
                  title: 'Quick Learner',
                  description: 'Completed 5 lessons in one day',
                ),
                _buildAchievement(
                  icon: Icons.local_fire_department,
                  title: 'On Fire',
                  description: '7 day learning streak',
                ),
                _buildAchievement(
                  icon: Icons.psychology,
                  title: 'Problem Solver',
                  description: 'Solved 50 coding challenges',
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildSection({
    required String title,
    required List<Widget> children,
  }) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          title,
          style: GoogleFonts.poppins(
            fontSize: 18,
            fontWeight: FontWeight.w600,
          ),
        ),
        const SizedBox(height: 16),
        ...children,
      ],
    );
  }

  Widget _buildAchievement({
    required IconData icon,
    required String title,
    required String description,
  }) {
    return Card(
      margin: const EdgeInsets.only(bottom: 12),
      child: ListTile(
        leading: Icon(icon, color: Colors.amber),
        title: Text(
          title,
          style: GoogleFonts.poppins(fontWeight: FontWeight.w500),
        ),
        subtitle: Text(
          description,
          style: GoogleFonts.poppins(fontSize: 12),
        ),
      ),
    );
  }
}

class _ProfileHeader extends StatelessWidget {
  const _ProfileHeader();

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        const CircleAvatar(
          radius: 50,
          backgroundImage: AssetImage('assets/images/logo.png'),
        ),
        const SizedBox(height: 16),
        Text(
          'John Doe',
          style: GoogleFonts.poppins(
            fontSize: 24,
            fontWeight: FontWeight.w600,
          ),
        ),
        const SizedBox(height: 4),
        Text(
          'Flutter Developer',
          style: GoogleFonts.poppins(
            fontSize: 16,
            color: Colors.grey[600],
          ),
        ),
        const SizedBox(height: 16),
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            _buildStat('Level', '15'),
            _buildDivider(),
            _buildStat('XP', '2,450'),
            _buildDivider(),
            _buildStat('Rank', '#125'),
          ],
        ),
      ],
    );
  }

  Widget _buildStat(String label, String value) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16),
      child: Column(
        children: [
          Text(
            value,
            style: GoogleFonts.poppins(
              fontSize: 18,
              fontWeight: FontWeight.w600,
            ),
          ),
          Text(
            label,
            style: GoogleFonts.poppins(
              fontSize: 14,
              color: Colors.grey[600],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildDivider() {
    return Container(
      height: 24,
      width: 1,
      color: Colors.grey[300],
    );
  }
}

class _ProgressCard extends StatelessWidget {
  final IconData icon;
  final String title;
  final String value;

  const _ProgressCard({
    required this.icon,
    required this.title,
    required this.value,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: const EdgeInsets.only(bottom: 12),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Row(
          children: [
            Container(
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: Colors.blue.shade50,
                borderRadius: BorderRadius.circular(12),
              ),
              child: Icon(icon, color: Colors.blue),
            ),
            const SizedBox(width: 16),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    title,
                    style: GoogleFonts.poppins(
                      fontSize: 14,
                      color: Colors.grey[600],
                    ),
                  ),
                  Text(
                    value,
                    style: GoogleFonts.poppins(
                      fontSize: 20,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _LearningPathCard extends StatelessWidget {
  final String title;
  final double progress;
  final int lessonsCompleted;
  final int totalLessons;

  const _LearningPathCard({
    required this.title,
    required this.progress,
    required this.lessonsCompleted,
    required this.totalLessons,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: const EdgeInsets.only(bottom: 12),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              title,
              style: GoogleFonts.poppins(
                fontSize: 16,
                fontWeight: FontWeight.w500,
              ),
            ),
            const SizedBox(height: 8),
            LinearProgressIndicator(
              value: progress,
              backgroundColor: Colors.grey[200],
              valueColor: AlwaysStoppedAnimation<Color>(Colors.blue),
            ),
            const SizedBox(height: 8),
            Text(
              '$lessonsCompleted of $totalLessons lessons completed',
              style: GoogleFonts.poppins(
                fontSize: 12,
                color: Colors.grey[600],
              ),
            ),
          ],
        ),
      ),
    );
  }
} 