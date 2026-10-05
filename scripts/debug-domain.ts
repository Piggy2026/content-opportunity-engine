import { detectTopicDomain } from '../server/services/domainDetector.js';

console.log('Result for "older men’s health recipes":', detectTopicDomain('older men’s health recipes'));
console.log('Result for "older men\'s health recipes":', detectTopicDomain("older men's health recipes"));
