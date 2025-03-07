import 'package:flutter/material.dart';
import 'login_screen.dart';
import 'signup_screen.dart';
import 'about_screen.dart';
import 'contact_screen.dart';
import 'doubts_screen.dart';
import 'freelance_screen.dart';

class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'CodeAcademy',
          style: TextStyle(color: Colors.white),
        ),
        backgroundColor: Colors.blueAccent,
        iconTheme: const IconThemeData(color: Colors.white),
      ),
      drawer: Drawer(
        backgroundColor: Colors.white,
        child: Column(
          children: [
            DrawerHeader(
              decoration: const BoxDecoration(color: Colors.blueAccent),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const Icon(Icons.code, color: Colors.white, size: 50),
                  const SizedBox(height: 10),
                  const Text(
                    'CodeAcademy Menu',
                    style: TextStyle(color: Colors.white, fontSize: 20, fontWeight: FontWeight.bold),
                  ),
                ],
              ),
            ),
            _buildDrawerItem(context, 'Home', Icons.home, const HomePage()),
            _buildDrawerItem(context, 'Sign Up', Icons.person_add, const SignUpScreen()),
            _buildDrawerItem(context, 'Login', Icons.login, const LoginScreen()),
            _buildDrawerItem(context, 'About', Icons.info, const AboutScreen()),
            _buildDrawerItem(context, 'Contact', Icons.contact_mail, const ContactScreen()),
            _buildDrawerItem(context, 'Doubts', Icons.help_outline, const DoubtsScreen()),
            _buildDrawerItem(context, 'Freelance', Icons.work, const FreelanceScreen()),
          ],
        ),
      ),
      body: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 20),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Text(
              'Welcome to CodeAcademy!',
              style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold, color: Colors.black),
            ),
            const SizedBox(height: 15),
            const Text(
              'The best platform for freelancers & developers!',
              textAlign: TextAlign.center,
              style: TextStyle(fontSize: 16, color: Colors.black54),
            ),
            const SizedBox(height: 30),
            ElevatedButton(
              onPressed: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => const LoginScreen()),
                );
              },
              style: ElevatedButton.styleFrom(
                backgroundColor: Colors.blueAccent,
                padding: const EdgeInsets.symmetric(horizontal: 40, vertical: 15),
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(30)),
              ),
              child: const Text('Login / Sign Up', style: TextStyle(fontSize: 16, color: Colors.white)),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildDrawerItem(BuildContext context, String title, IconData icon, Widget page) {
    return ListTile(
      leading: Icon(icon, color: Colors.blueAccent),
      title: Text(title, style: const TextStyle(color: Colors.black)),
      onTap: () {
        Navigator.push(context, MaterialPageRoute(builder: (context) => page));
      },
    );
  }
}