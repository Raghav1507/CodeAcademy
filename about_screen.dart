import 'package:flutter/material.dart';

class AboutScreen extends StatelessWidget {
  const AboutScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('About Us')),
      body: const Center(
        child: Text(
          'CodeAcademy is a freelancing platform for developers!',
          style: TextStyle(fontSize: 18),
        ),
      ),
    );
  }
}
