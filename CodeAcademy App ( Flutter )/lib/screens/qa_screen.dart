import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class QAScreen extends StatefulWidget {
  const QAScreen({super.key});

  @override
  State<QAScreen> createState() => _QAScreenState();
}

class _QAScreenState extends State<QAScreen> {
  final _questionController = TextEditingController();
  final _descriptionController = TextEditingController();
  final _priceController = TextEditingController();
  final _answerController = TextEditingController();

  final List<Map<String, dynamic>> _questions = [
    {
      'title': 'How to implement authentication in React?',
      'description': 'I need help setting up JWT authentication in my React application. Looking for best practices and security considerations.',
      'price': 10,
      'author': 'Current User',
      'answers': [],
    },
    {
      'title': 'Best way to handle state management in Flutter?',
      'description': 'I\'m new to Flutter and confused about state management. Should I use Provider, Bloc, or Riverpod?',
      'price': 15,
      'author': 'Current User',
      'answers': [],
    },
    {
      'title': 'Python Django REST API optimization',
      'description': 'My Django REST API is getting slow with increasing data. How can I optimize the performance?',
      'price': 20,
      'author': 'Current User',
      'answers': [],
    },
    {
      'title': 'Mobile app UI/UX best practices',
      'description': 'Looking for modern UI/UX design patterns for mobile applications. Any resources or examples?',
      'price': 12,
      'author': 'Current User',
      'answers': [],
    },
    {
      'title': 'Database design for e-commerce',
      'description': 'Need help designing a scalable database schema for an e-commerce platform.',
      'price': 25,
      'author': 'Current User',
      'answers': [],
    },
  ];

  @override
  void dispose() {
    _questionController.dispose();
    _descriptionController.dispose();
    _priceController.dispose();
    _answerController.dispose();
    super.dispose();
  }

  void _showAskQuestionDialog() {
    showDialog(
      context: context,
      builder: (context) => Dialog(
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(20),
        ),
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              Text(
                'Ask a Question',
                style: GoogleFonts.poppins(
                  fontSize: 20,
                  fontWeight: FontWeight.bold,
                ),
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 16),
              TextField(
                controller: _questionController,
                decoration: InputDecoration(
                  labelText: 'Question Title',
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(12),
                  ),
                ),
              ),
              const SizedBox(height: 16),
              TextField(
                controller: _descriptionController,
                maxLines: 3,
                decoration: InputDecoration(
                  labelText: 'Description',
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(12),
                  ),
                ),
              ),
              const SizedBox(height: 16),
              TextField(
                controller: _priceController,
                keyboardType: TextInputType.number,
                decoration: InputDecoration(
                  labelText: 'Price (in \$)',
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(12),
                  ),
                ),
              ),
              const SizedBox(height: 24),
              ElevatedButton(
                onPressed: () {
                  if (_questionController.text.isNotEmpty &&
                      _descriptionController.text.isNotEmpty &&
                      _priceController.text.isNotEmpty) {
                    setState(() {
                      _questions.insert(0, {
                        'title': _questionController.text,
                        'description': _descriptionController.text,
                        'price': int.parse(_priceController.text),
                        'author': 'Current User',
                        'answers': [],
                      });
                    });
                    _questionController.clear();
                    _descriptionController.clear();
                    _priceController.clear();
                    Navigator.pop(context);
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(
                        content: Text('Question posted successfully!'),
                        backgroundColor: Colors.green,
                      ),
                    );
                  }
                },
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.green,
                  foregroundColor: Colors.white,
                  padding: const EdgeInsets.symmetric(vertical: 16),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(12),
                  ),
                ),
                child: const Text('Post Question'),
              ),
            ],
          ),
        ),
      ),
    );
  }

  void _showAnswerDialog(int questionIndex) {
    showDialog(
      context: context,
      builder: (context) => Dialog(
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(20),
        ),
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              Text(
                'Answer Question',
                style: GoogleFonts.poppins(
                  fontSize: 20,
                  fontWeight: FontWeight.bold,
                ),
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 16),
              Text(
                _questions[questionIndex]['title'],
                style: GoogleFonts.poppins(
                  fontSize: 16,
                  fontWeight: FontWeight.w600,
                ),
              ),
              const SizedBox(height: 16),
              TextField(
                controller: _answerController,
                maxLines: 5,
                decoration: InputDecoration(
                  labelText: 'Your Answer',
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(12),
                  ),
                ),
              ),
              const SizedBox(height: 24),
              ElevatedButton(
                onPressed: () {
                  if (_answerController.text.isNotEmpty) {
                    setState(() {
                      _questions[questionIndex]['answers'].add({
                        'text': _answerController.text,
                        'author': 'Current User',
                        'timestamp': DateTime.now(),
                      });
                    });
                    _answerController.clear();
                    Navigator.pop(context);
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(
                        content: Text('Answer posted successfully!'),
                        backgroundColor: Colors.green,
                      ),
                    );
                  }
                },
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.blue,
                  foregroundColor: Colors.white,
                  padding: const EdgeInsets.symmetric(vertical: 16),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(12),
                  ),
                ),
                child: const Text('Post Answer'),
              ),
            ],
          ),
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(
          'Q&A Platform',
          style: GoogleFonts.poppins(
            fontWeight: FontWeight.w600,
          ),
        ),
        centerTitle: true,
        automaticallyImplyLeading: false,
        actions: [
          IconButton(
            icon: const Icon(Icons.logout),
            onPressed: () {
              Navigator.pushReplacementNamed(context, '/login');
            },
            splashRadius: 1,
            highlightColor: Colors.transparent,
            splashColor: Colors.transparent,
          ),
        ],
        elevation: 0,
      ),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: Text(
              'Ask questions and earn money by providing answers',
              style: GoogleFonts.poppins(
                fontSize: 16,
                color: Colors.grey[600],
              ),
              textAlign: TextAlign.center,
            ),
          ),
          Expanded(
            child: ListView.builder(
              padding: const EdgeInsets.all(16),
              itemCount: _questions.length,
              itemBuilder: (context, index) {
                return _buildQuestionCard(index);
              },
            ),
          ),
        ],
      ),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: _showAskQuestionDialog,
        icon: const Icon(Icons.add),
        label: const Text('Ask Question'),
        backgroundColor: Colors.green,
      ),
    );
  }

  Widget _buildQuestionCard(int index) {
    final question = _questions[index];
    return Card(
      margin: const EdgeInsets.only(bottom: 16),
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(12),
      ),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Expanded(
                  child: Text(
                    question['title'],
                    style: GoogleFonts.poppins(
                      fontSize: 16,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ),
                Container(
                  padding: const EdgeInsets.symmetric(
                    horizontal: 12,
                    vertical: 6,
                  ),
                  decoration: BoxDecoration(
                    color: Colors.green,
                    borderRadius: BorderRadius.circular(20),
                  ),
                  child: Text(
                    '\$${question['price']}',
                    style: GoogleFonts.poppins(
                      color: Colors.white,
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 8),
            Text(
              question['description'],
              style: GoogleFonts.poppins(
                color: Colors.grey[600],
              ),
            ),
            const SizedBox(height: 16),
            if (question['answers'].isNotEmpty) ...[
              Text(
                'Answers (${question['answers'].length})',
                style: GoogleFonts.poppins(
                  fontSize: 14,
                  fontWeight: FontWeight.w600,
                ),
              ),
              const SizedBox(height: 8),
              ...question['answers'].map<Widget>((answer) {
                return Container(
                  margin: const EdgeInsets.only(bottom: 8),
                  padding: const EdgeInsets.all(12),
                  decoration: BoxDecoration(
                    color: Colors.grey[100],
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        answer['text'],
                        style: GoogleFonts.poppins(),
                      ),
                      const SizedBox(height: 8),
                      Text(
                        'Answered by: ${answer['author']}',
                        style: GoogleFonts.poppins(
                          fontSize: 12,
                          color: Colors.grey[600],
                        ),
                      ),
                    ],
                  ),
                );
              }).toList(),
              const SizedBox(height: 8),
            ],
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Expanded(
                  child: Text(
                    'Posted by: ${question['author']}',
                    style: GoogleFonts.poppins(
                      fontSize: 12,
                      color: Colors.grey[600],
                    ),
                  ),
                ),
                Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    TextButton.icon(
                      onPressed: () {
                        showDialog(
                          context: context,
                          builder: (context) => AlertDialog(
                            title: const Text('Delete Question'),
                            content: const Text('Are you sure you want to delete this question?'),
                            actions: [
                              TextButton(
                                onPressed: () => Navigator.pop(context),
                                style: ButtonStyle(
                                  splashFactory: NoSplash.splashFactory,
                                ),
                                child: const Text('Cancel'),
                              ),
                              TextButton(
                                onPressed: () {
                                  setState(() {
                                    _questions.removeAt(index);
                                  });
                                  Navigator.pop(context);
                                  ScaffoldMessenger.of(context).showSnackBar(
                                    const SnackBar(
                                      content: Text('Question deleted successfully!'),
                                      backgroundColor: Colors.red,
                                    ),
                                  );
                                },
                                style: ButtonStyle(
                                  splashFactory: NoSplash.splashFactory,
                                ),
                                child: const Text(
                                  'Delete',
                                  style: TextStyle(color: Colors.red),
                                ),
                              ),
                            ],
                          ),
                        );
                      },
                      style: TextButton.styleFrom(
                        foregroundColor: Colors.red,
                        padding: const EdgeInsets.symmetric(horizontal: 8),
                        splashFactory: NoSplash.splashFactory,
                      ),
                      icon: const Icon(Icons.delete_outline, size: 18),
                      label: const Text('Delete'),
                    ),
                    TextButton.icon(
                      onPressed: () => _showAnswerDialog(index),
                      style: TextButton.styleFrom(
                        foregroundColor: Colors.blue,
                        padding: const EdgeInsets.symmetric(horizontal: 8),
                        splashFactory: NoSplash.splashFactory,
                      ),
                      icon: const Icon(Icons.reply, size: 18),
                      label: const Text('Answer'),
                    ),
                  ],
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
} 