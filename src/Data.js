export const initialBuddies = [
  {
    id: 1,
    name: "Sarah Chen",
    avatar: "https://i.pravatar.cc/150?img=5",
    expertise: "React & JavaScript",
  },
  {
    id: 2,
    name: "Marcus Johnson",
    avatar: "https://i.pravatar.cc/150?img=12",
    expertise: "Calculus & Linear Algebra",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    avatar: "https://i.pravatar.cc/150?img=9",
    expertise: "Biology & Chemistry",
  },
  {
    id: 4,
    name: "Alex Kim",
    avatar: "",
    expertise: "Data Structures & Algorithms",
  },
];

export const initialSessions = [
  {
    id: 101,
    topic: "React Hooks Deep Dive",
    duration: "90",
    type: "learning", // You learned from them (you owe them time)
    buddies: [1], // Array of buddy IDs involved
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
  },
  {
    id: 102,
    topic: "Calculus Problem Set",
    duration: "60",
    type: "teaching", // You taught them (they owe you time)
    buddies: [2],
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
  },
  {
    id: 103,
    topic: "Group Study - Finals Prep",
    duration: "120",
    type: "collaborative", // No debt created
    buddies: [1, 2, 3], // Group session with multiple buddies
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
  },
  {
    id: 104,
    topic: "JavaScript Async/Await",
    duration: "45",
    type: "learning",
    buddies: [1],
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
  },
  {
    id: 105,
    topic: "Chemistry Lab Review",
    duration: "75",
    type: "collaborative",
    buddies: [3],
    date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
  },
  {
    id: 106,
    topic: "Algorithm Design",
    duration: "90",
    type: "teaching",
    buddies: [4],
    date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
  },
];

export const initialScheduledSessions = [
  {
    id: 201,
    topic: "React State Management Workshop",
    date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    time: "14:00",
    buddies: [1, 4], // Sarah and Alex
    completed: false,
  },
  {
    id: 202,
    topic: "Biology Midterm Study Group",
    date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    time: "10:00",
    buddies: [3, 4], // Emily and ALex
    completed: false,
  },
];

const getBuddies = (scheduleId) => {
  let buddies = [];
  initialScheduledSessions.forEach((session) => {
    if (session.id == scheduleId) {
      session.buddies.forEach((buddyId) => {
        initialBuddies.forEach((buddy) => {
          if (buddyId == buddy.id) {
            buddies.push(buddy.name);
          }
        });
      });
    }
  });
  return buddies;
};
