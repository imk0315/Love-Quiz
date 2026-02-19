/**
 * CANDIDATES
 * Each candidate corresponds to a dominant answer vector (A=0, B=1, C=2, D=3).
 * resultType: personality label shown on result card.
 * traits: shown in match page.
 * greetings: opening lines for private chat.
 */
export const CANDIDATES = [
  {
    id: 'yueue',
    name: '月月',
    avatar: '🌙',
    type: '溫柔體貼・善解人意',
    compat: 92,
    resultType: '浪漫型戀人',
    desc: '重視浪漫氣氛，感情細膩豐富',
    traits: ['浪漫', '細膩', '儀式感', '深情'],
    greetings: [
      '嗨！我是月月，很高興認識你 😊',
      '看到測驗結果，感覺我們真的很有緣分呢！',
      '你平常喜歡怎麼樣的約會方式呢？',
    ],
    autoReplies: [
      '哇，這個想法好浪漫！',
      '我也有這樣的感覺呢 🌙',
      '你說的我完全可以理解～',
      '繼續說！我想多了解你 💕',
      '哈哈，你真的很有趣耶！',
    ],
  },
  {
    id: 'xingxing',
    name: '星星',
    avatar: '⭐',
    type: '活潑開朗・充滿活力',
    compat: 87,
    resultType: '冒險型戀人',
    desc: '享受新鮮感，充滿探索精神',
    traits: ['活潑', '冒險', '積極', '樂觀'],
    greetings: [
      '嗨嗨！我是星星 ⭐ 超開心認識你！',
      '你的測驗結果看起來我們超配的！',
      '你喜歡戶外活動嗎？我好愛爬山！',
    ],
    autoReplies: [
      '哈哈哈好好笑！',
      '我也覺得！要不要一起去玩？',
      '聽起來很刺激耶！',
      '你這個人感覺很有活力！',
      '下次可以帶我一起去嗎？⭐',
    ],
  },
  {
    id: 'qingqing',
    name: '晴晴',
    avatar: '☀️',
    type: '獨立自主・知性優雅',
    compat: 95,
    resultType: '深情型戀人',
    desc: '情感豐富，深愛一個人時全心投入',
    traits: ['深情', '知性', '獨立', '真誠'],
    greetings: [
      '你好，我是晴晴 ☀️',
      '看了你的測驗，覺得你是個很有想法的人。',
      '可以聊聊你對感情最重視什麼嗎？',
    ],
    autoReplies: [
      '這個觀點很有意思，我想深入了解。',
      '我覺得你說的很對。',
      '嗯嗯，繼續說 ☀️',
      '你思考事情的方式讓我很欣賞。',
      '我喜歡這樣認真交流的感覺。',
    ],
  },
  {
    id: 'xiaoling',
    name: '小霖',
    avatar: '🌱',
    type: '穩重踏實・默默守護',
    compat: 89,
    resultType: '安全型戀人',
    desc: '重視安全感，給伴侶最大的支持',
    traits: ['穩重', '可靠', '溫暖', '踏實'],
    greetings: [
      '嗨，我是小霖 🌱',
      '很高興認識你，希望我們可以好好聊聊。',
      '你平常有什麼興趣或愛好嗎？',
    ],
    autoReplies: [
      '謝謝你分享這些 🌱',
      '我在這裡，你說吧。',
      '聽起來你是個很用心的人。',
      '有什麼需要，隨時告訴我。',
      '我覺得能認識你真的很好。',
    ],
  },
]
