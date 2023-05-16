import React, { useState } from 'react';
import Statistics from 'components/Statistics/';
import FeedbackOptions from 'components/FeedbackOptions';
import Section from 'components/Section';
import Notification from 'components/Notification';
import css from './feedback.module.css';

const Feedback = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleClick = option => {
      switch (option) {
        case 'good':
          setGood(prevGood => prevGood + 1);
          break;
        case 'neutral':
          setNeutral(prevNeutral => prevNeutral + 1);
          break;
        case 'bad':
          setBad(prevBad => prevBad + 1);
          break;
        default:
          break;
      }
     }

  const countTotalFeedback = () => {
    return good + neutral + bad;
  };

  const countPositiveFeedbackPercentage = () => {
    const totalFeedback = countTotalFeedback();
    return totalFeedback ? Math.round((good / totalFeedback) * 100) : 0;
  };

  const totalFeedback = countTotalFeedback();
  const positiveFeedbackPercentage = countPositiveFeedbackPercentage();

  return (
    <div className={css.container}>
      <h1 className={css.title}>Please leave feedback</h1>
      <Section title="FeedbackOptions">
        <FeedbackOptions
          options={ Object.keys({ good, neutral, bad })}
          onLeaveFeedback={handleClick}
        />
      </Section>
      <Section>
        {totalFeedback === 0 ? (
          <Notification message="There is no feedback" />
        ) : (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={totalFeedback}
            positivePercentage={positiveFeedbackPercentage}
          />
        )}
      </Section>
    </div>
  );
};

export default Feedback;
