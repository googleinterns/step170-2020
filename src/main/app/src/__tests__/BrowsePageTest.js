import React from 'react';
import { shallow } from 'enzyme';
import BrowsePage from '../pages/BrowsePage.js';
import GameCard from '../constants/GameCard.js';
import ArticleCard from '../constants/ArticleCard.js';
import VideoCard from '../constants/VideoCard.js';

it('renders without crashing', () => {
  shallow(<BrowsePage />);
});

it('renders card component', () => {
  const wrapper = shallow(<BrowsePage />);
  expect(wrapper.contains(<GameCard /> || <ArticleCard /> || <VideoCard />));
});
