/**
 * QUIZ_DATA
 * Each quiz has an id, name, icon, description, and 5 questions.
 * Each question has 4 options (A/B/C/D).
 * Answers map to a vector index 0–3 for personality matching.
 */
export const QUIZ_DATA = [
  {
    id: 'love-style',
    name: '你的戀愛風格',
    icon: '❤️',
    iconBg: 'linear-gradient(135deg,#FBCFE8,#F9A8D4)',
    description: '探索你在感情中的獨特需求',
    questions: [
      {
        text: '當你喜歡一個人時，你通常會？',
        options: [
          '直接表白，勇敢說出來',
          '默默關心，等待時機',
          '請朋友試探對方心意',
          '用行動表示，希望對方察覺',
        ],
      },
      {
        text: '你認為理想的約會方式是？',
        options: [
          '浪漫燭光晚餐',
          '一起看電影或追劇',
          '戶外運動或冒險活動',
          '在家一起做飯聊天',
        ],
      },
      {
        text: '在感情中，你最在意的是？',
        options: [
          '浪漫氣氛與儀式感',
          '互相信任與尊重',
          '共同興趣與話題',
          '安全感與穩定',
        ],
      },
      {
        text: '當感情遇到困難時，你會？',
        options: [
          '直接溝通，坦誠面對',
          '給對方一些空間',
          '找朋友尋求建議',
          '默默承受，希望時間解決',
        ],
      },
      {
        text: '你認為維持感情最重要的是？',
        options: [
          '經常約會保持新鮮感',
          '彼此尊重個人空間',
          '共同成長與進步',
          '日常陪伴與關心',
        ],
      },
    ],
  },
  {
    id: 'ideal-partner',
    name: '理想伴侶類型',
    icon: '✨',
    iconBg: 'linear-gradient(135deg,#DDD6FE,#C4B5FD)',
    description: '發現最適合你的另一半特質',
    questions: [
      {
        text: '你希望另一半是？',
        options: [
          '主動積極、充滿活力',
          '溫柔細心、善解人意',
          '幽默風趣、帶來歡笑',
          '穩重可靠、讓你安心',
        ],
      },
      {
        text: '你最欣賞伴侶的哪種特質？',
        options: ['才華橫溢', '體貼溫柔', '獨立自主', '忠誠專一'],
      },
      {
        text: '在一段關係中你希望？',
        options: [
          '保持各自的空間',
          '時刻黏在一起',
          '分工合作共同生活',
          '各自追夢但互相支持',
        ],
      },
      {
        text: '伴侶最讓你感動的行為是？',
        options: [
          '記住你喜歡的小事',
          '在你低落時陪伴',
          '幫你實現夢想',
          '給你驚喜',
        ],
      },
      {
        text: '你希望兩人之間的溝通方式是？',
        options: [
          '直接表達，有話就說',
          '通過行動而非言語',
          '定期有深度的長談',
          '隨時保持聯絡',
        ],
      },
    ],
  },
  {
    id: 'emotion-style',
    name: '感情處理方式',
    icon: '💫',
    iconBg: 'linear-gradient(135deg,#FDE68A,#FCA5A5)',
    description: '了解你在感情危機時的應對',
    questions: [
      {
        text: '伴侶忘記你們的紀念日，你會？',
        options: [
          '直接告訴他你很在乎這件事',
          '假裝沒事，但心裡難受',
          '創造補救的機會',
          '這對我來說不重要',
        ],
      },
      {
        text: '當你們發生爭吵後，你通常？',
        options: [
          '冷靜後主動和好',
          '等對方先道歉',
          '馬上尋求和解',
          '需要一段時間沉澱',
        ],
      },
      {
        text: '你嫉妒時的反應是？',
        options: [
          '直接說出不安全感',
          '假裝不在意',
          '用行動加深彼此感情',
          '和朋友訴說',
        ],
      },
      {
        text: '伴侶有秘密不告訴你，你會？',
        options: [
          '直接問，保持透明',
          '尊重他的隱私',
          '自己想辦法了解',
          '等他準備好自然會說',
        ],
      },
      {
        text: '你如何在感情中表達愛？',
        options: [
          '語言表達，常說「我愛你」',
          '實際行動，默默付出',
          '送禮物或驚喜',
          '高質量的相處時光',
        ],
      },
    ],
  },
]
