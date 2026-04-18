import Draw from '../models/Draw.js';
import Score from '../models/Score.js';
import User from '../models/User.js';

export const runDrawSimulation = async (req, res) => {
  try {
    const winningNumbers = [];
    while(winningNumbers.length < 5) {
      const n = Math.floor(Math.random() * 45) + 1;
      if(!winningNumbers.includes(n)) winningNumbers.push(n);
    }

    const activeSubscribers = await User.countDocuments({ subscriptionStatus: 'active' });
    const totalPrizePool = activeSubscribers * 50;

    const results = { tier5: [], tier4: [], tier3: [] };
    const users = await User.find({ subscriptionStatus: 'active' });

    for (const user of users) {
      const scores = await Score.find({ userId: user._id });
      const matches = scores.filter(s => winningNumbers.includes(s.value)).length;

      if (matches === 5) results.tier5.push(user._id);
      else if (matches === 4) results.tier4.push(user._id);
      else if (matches === 3) results.tier3.push(user._id);
    }

    const newDraw = new Draw({
      winningNumbers,
      totalPrizePool,
      status: 'simulated'
    });

    await newDraw.save();
    res.status(200).json({ winningNumbers, winnersCount: results, totalPrizePool });
  } catch (err) {
     console.error("Error From runDrawSimulation controller : ", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};