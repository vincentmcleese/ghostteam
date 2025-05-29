-- Insert questions for the AI Forward Recruiter quiz
INSERT INTO questions (quiz_id, text, order_number)
VALUES 
  ('00000000-0000-0000-0000-000000000001', 'How often do you use AI tools in your recruitment process?', 1),
  ('00000000-0000-0000-0000-000000000001', 'Which AI tools are you currently using?', 2),
  ('00000000-0000-0000-0000-000000000001', 'How comfortable is your team with adopting new AI technologies?', 3),
  ('00000000-0000-0000-0000-000000000001', 'What is your biggest challenge with implementing AI in recruitment?', 4),
  ('00000000-0000-0000-0000-000000000001', 'How do you measure the impact of AI on your recruitment process?', 5)
ON CONFLICT DO NOTHING;

-- Get the IDs of the inserted questions
DO $$
DECLARE
  q1_id UUID;
  q2_id UUID;
  q3_id UUID;
  q4_id UUID;
  q5_id UUID;
BEGIN
  SELECT id INTO q1_id FROM questions WHERE quiz_id = '00000000-0000-0000-0000-000000000001' AND order_number = 1;
  SELECT id INTO q2_id FROM questions WHERE quiz_id = '00000000-0000-0000-0000-000000000001' AND order_number = 2;
  SELECT id INTO q3_id FROM questions WHERE quiz_id = '00000000-0000-0000-0000-000000000001' AND order_number = 3;
  SELECT id INTO q4_id FROM questions WHERE quiz_id = '00000000-0000-0000-0000-000000000001' AND order_number = 4;
  SELECT id INTO q5_id FROM questions WHERE quiz_id = '00000000-0000-0000-0000-000000000001' AND order_number = 5;

  -- Insert answer options for question 1
  INSERT INTO answer_options (question_id, text, value, order_number)
  VALUES
    (q1_id, 'Never', '0', 1),
    (q1_id, 'Occasionally', '1', 2),
    (q1_id, 'Regularly', '2', 3),
    (q1_id, 'Extensively', '3', 4);

  -- Insert answer options for question 2
  INSERT INTO answer_options (question_id, text, value, order_number)
  VALUES
    (q2_id, 'None', '0', 1),
    (q2_id, 'Basic AI tools (e.g., resume screening)', '1', 2),
    (q2_id, 'Multiple AI tools across the recruitment process', '2', 3),
    (q2_id, 'Advanced AI systems integrated with our ATS', '3', 4);

  -- Insert answer options for question 3
  INSERT INTO answer_options (question_id, text, value, order_number)
  VALUES
    (q3_id, 'Very uncomfortable', '0', 1),
    (q3_id, 'Somewhat uncomfortable', '1', 2),
    (q3_id, 'Comfortable', '2', 3),
    (q3_id, 'Very comfortable and enthusiastic', '3', 4);

  -- Insert answer options for question 4
  INSERT INTO answer_options (question_id, text, value, order_number)
  VALUES
    (q4_id, 'Budget constraints', '0', 1),
    (q4_id, 'Team resistance', '1', 2),
    (q4_id, 'Integration with existing systems', '2', 3),
    (q4_id, 'Finding the right AI tools', '3', 4);

  -- Insert answer options for question 5
  INSERT INTO answer_options (question_id, text, value, order_number)
  VALUES
    (q5_id, E'We don''t currently measure impact', '0', 1),
    (q5_id, 'Basic metrics (time-to-hire, cost-per-hire)', '1', 2),
    (q5_id, 'Comprehensive metrics with regular reporting', '2', 3),
    (q5_id, 'Advanced analytics with predictive insights', '3', 4);
END $$;
