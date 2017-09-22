/**
 * This file provided by Facebook is for non-commercial testing and evaluation
 * purposes only.  Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

<<<<<<< HEAD
 class User {}
=======
export class User {}
>>>>>>> 986123cadb8d3cee76a008c90a6b7245b77a5d33

// Mock authenticated ID
const VIEWER_ID = 'me';

// Mock user data
const viewer = new User();
viewer.id = VIEWER_ID;
const usersById = {
  [VIEWER_ID]: viewer,
};

// Mock todo data
const todosById = {};
const todoIdsByUser = {
  [VIEWER_ID]: [],
};

var achievements = [
  {id: 1,year: 1956, text: 'Mom was born, there\'s probability of you existing at all comes out to 1 in 102,685,000 — yes, that\'s a 10 followed by 2,685,000 zeroes. I think that\'s a considerable achievement.'},
  {id: 2,year: 1980, text: 'This year\'s just a guess, Mom became a local midwife, pregnent patients would often come to our home at any time of the day, be it in weekends, 24/7, when it\'s time for labor, sometimes she would have more than one patient, she told me someetimes she\'d have 5 patients a day.'},
  {id: 3,year: 1981, text: 'Our eldest was born healthy, some would not consider it an achievement but having baby in your womb for months and giving labor is not easy, and I love my sister, she\'s a great person.'},
  {id: 4,year: 1982, text: 'Second eldest in our family was born healthy. My sisters are great, I love them. Raising two great sisters is a great achievement.'},
  {id: 5,year: 1982, text: 'until she left for abroad, people likes mom a lot, she had a great reputation of being a midwife, she\'s been also assigned to other barangays and I go with her a lot, strangers would sometimes recognize me by her, one time I was lost, it was far from home, I was taken home by stranger because he/she knows my mother.'},
  {id: 6,year: 1992, text: 'My sister before me was born, she\'s a great sister and I love her, all my sisters are nurses and I am proud of them.'},
  {id: 7,year: 1995, text: 'I was born... I am... a good person...'},
  {id: 8,year: 2007, text: 'Had the best elementary years, life is good, hard times becomes easy with Mom beside'},
  {id: 9,year: 2011, text: 'Had not so best highschool, I became a PC gamer. I started to have difficulty socializing with other people. Made good friends. Life\'s great, Mom provided everything I needed in school and everything.'},
  {id: 10,year: 2015, text: 'Mom payed everything in College, everything I needed. it\'s expensive and I never had a hard time, I graduated after 4 and half years'},
  {id: 11,year: 2017, text: 'I miss my mom, we talk a lot, she provided me everything I needed ever since I was born, I am grateful of everything I have. Though she\'s still not yet here with us, some people, even those whom I do not know would still ask about her and I\'d hear lots of good things about her, I am so proud of my Mom. She\'s the best creature God has made.'}
];

<<<<<<< HEAD
 function getMomImageLink() {
  return 'https://i.imgur.com/aubov86.jpg';
}
 function getAchievements() {
  return achievements;
}
 function getUser(id) {
  return usersById[id];
}

 function getViewer() {
  return getUser(VIEWER_ID);
}
module.exports = {
  User,
  getMomImageLink,
  getAchievements,
  getUser,
  getViewer
}
=======
export function getMomImageLink() {
  return 'https://i.imgur.com/aubov86.jpg';
}
export function getAchievements() {
  return achievements;
}
export function getUser(id) {
  return usersById[id];
}

export function getViewer() {
  return getUser(VIEWER_ID);
}
>>>>>>> 986123cadb8d3cee76a008c90a6b7245b77a5d33
