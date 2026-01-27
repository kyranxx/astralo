/**
 * The 12 Houses of Astrology - Chinese (Complete Guide)
 */
import type { BlogPostTranslation } from '../../types';

export const zh: BlogPostTranslation = {
  title: '🏠 占星學的 12 宮位：你的人生完整地圖指南',
  excerpt: '探索你不為人知的人生在圖。深度解析占星學的 12 個宮位，解釋你的行星能量在哪裡發揮作用，以及如何掌握你的命運。',
  category: '占星學基礎',
  metaDescription: '占星學 12 宮位的完整指南。學習每個宮位的含義，它們如何影響事業和愛情等生活領域，以及如何像專家一樣解讀本命盤中的宮位。',
  keywords: '占星宮位, 12 宮位, 黃道宮位, 本命盤解讀, 第一宮, 第七宮, 中天, 角宮, 續宮, 果宮, 宮主星, 星群, 截奪宮',
  quickSummary: [
    '12 宮位代表你生活中的「地點」——如事業、家庭和關係等特定舞台。',
    '宮位分為角宮 (Angular)、續宮 (Succedent) 和果宮 (Cadent)，每個宮位具有不同的能量水平。',
    '上升點標誌著第一宮的開始，並設定了整個星盤的結構。',
    '空宮並不意味著該生活領域「缺失」——它們由特定的行星守護。'
  ],
  keyTakeaways: [
    '角宮 (1, 4, 7, 10) 是你生活中最活躍和顯眼的領域。',
    '宮主星（守護宮頭星座的行星）提供了該生活領域的祕密鑰匙。',
    '四個主要軸點 (AC, IC, DC, MC)定義了你的人生目標十字。',
    '理解宮位對於占星學中的計時和預測至關重要。'
  ],
  tableOfContents: [
    { id: 'introduction', title: '舞台：為什麼宮位很重要' },
    { id: 'house-systems', title: '理解宮位制：普拉西德 vs 整宮制' },
    { id: 'angular-succedent-cadent', title: '三種模式：力量與時間' },
    { id: 'the-first-house', title: '第一宮：自我之宮（身分）' },
    { id: 'the-second-house', title: '第二宮：價值之宮（財富）' },
    { id: 'the-third-house', title: '第三宮：溝通之宮' },
    { id: 'the-fourth-house', title: '第四宮：家庭之宮（根源）' },
    { id: 'the-fifth-house', title: '第五宮：歡樂之宮' },
    { id: 'the-sixth-house', title: '第六宮：服務之宮' },
    { id: 'the-seventh-house', title: '第七宮：夥伴之宮' },
    { id: 'the-eighth-house', title: '第八宮：轉化之宮' },
    { id: 'the-ninth-house', title: '第九宮：智慧之宮' },
    { id: 'the-tenth-house', title: '第十宮：目標之宮' },
    { id: 'the-eleventh-house', title: '第十一宮：社群之宮' },
    { id: 'the-twelfth-house', title: '第十二宮：潛意識之宮' },
    { id: 'planetary-placements', title: '宮位中的主要行星' },
    { id: 'stelliums', title: '什麼是星群 (Stellium)？' },
    { id: 'empty-houses', title: '如果宮位是空的怎麼辦？宮主星的力量' },
    { id: 'retrograde', title: '宮位中的逆行行星' },
    { id: 'derived-houses', title: '進階技巧：衍生宮位' },
    { id: 'progressions', title: '推運宮位：生命週期如何演變' },
    { id: 'conclusion', title: '整合你的星盤' }
  ],
  content: `
      <h2 id="introduction">舞台：為什麼宮位很重要</h2>
      <p>如果你曾經看過你的本命盤，並對線條、符號和幾何形狀感到不知所措，你並不孤單。占星學是由三個主要部分組成的語言：星座、行星和宮位。**行星**代表「演員」（發生什麼），**星座**代表「服裝」（如何發生），而**占星學的 12 宮位**代表「舞台」（在哪裡發生）。</p>
      
      <p>想像你的人生是一齣戲。火星是演員（充滿動力）。如果他在牡羊座，他是快速的。但他在哪裡表演？如果他在第 10 宮（事業），他是一位積極的企業家。沒有宮位，占星學純粹是心理學；有了宮位，它變得實用且具預測性。</p>

      <h2 id="house-systems">理解宮位制：普拉西德 (Placidus) vs 整宮制 (Whole Sign)</h2>
      <p>天空有幾十種劃分方式。最常見的：</p>
      
      <h3>普拉西德制 (Placidus)</h3>
      <p>現代默認系統。基於時間。宮位大小可以不同。非常適合深層心理學。</p>

      <h3>整宮制 (Whole Sign)</h3>
      <p>最古老的系統。每個星座都是一個完整的宮位。非常適合清晰、具體的預測。Astralo 默認使用此系統以保持清晰。</p>

      <h2 id="angular-succedent-cadent">三種模式：力量與時間</h2>
      <p>宮位分為三組，決定了它們的「動態」能量。</p>
      
      <h3>1. 角宮 (Angular) (1, 4, 7, 10)</h3>
      <p>這些是「力量宮位」。這裡的行星非常活躍且顯眼。它們定義了星盤的四個主要點：上升點、天底、下降點和中天。</p>

      <h3>2. 續宮 (Succedent) (2, 5, 8, 11)</h3>
      <p>提供穩定性和資源（金錢、孩子、共享財富）。代表我們鞏固收益的「中間」階段。</p>

      <h3>3. 果宮 (Cadent) (3, 6, 9, 12)</h3>
      <p>過渡和心理處理的宮位。這裡的行星通常更內在或智力化。為下一個週期做準備。</p>

      <h2 id="the-first-house">第一宮：自我之宮（身分）</h2>
      <p>始於**上升點**。你看世界的過濾器。主宰你的外表和活力。<br><strong>太陽在第一宮：</strong>強大的存在感，高能量。<br><strong>土星在第一宮：</strong>嚴肅的舉止，大器晚成。</p>

      <h2 id="the-second-house">第二宮：價值之宮（財富）</h2>
      <p>你的銀行帳戶，也是你的自我價值。主宰個人財產。<br><strong>木星在第二宮：</strong>金錢運好。<br><strong>冥王星在第二宮：</strong>財務死亡和重生的強烈週期。</p>

      <h2 id="the-third-house">第三宮：溝通之宮</h2>
      <p>你的周遭環境。你如何思考和說話。<br><strong>水星在第三宮：</strong>思維敏捷，「永遠的學生」。</p>

      <h2 id="the-fourth-house">第四宮：家庭之宮（根源）</h2>
      <p>星盤的底部 (IC)。家庭、根源和私生活。<br><strong>月亮在第四宮：</strong>對家非常保護和情緒化。</p>

      <h2 id="the-fifth-house">第五宮：歡樂之宮</h2>
      <p>自我表達和樂趣。創造力、浪漫和孩子。<br><strong>金星在第五宮：</strong>愛上愛情，富有藝術氣息。</p>

      <h2 id="the-sixth-house">第六宮：服務之宮</h2>
      <p>日常例行公事和健康。不是你的事業（那是第 10 宮），而是你的日常工作。<br><strong>火星在第六宮：</strong>努力工作，充滿活力的例行公事。</p>

      <h2 id="the-seventh-house">第七宮：夥伴之宮</h2>
      <p>下降點 (Descendant)。承諾的關係——婚姻和商業夥伴。<br><strong>土星在第七宮：</strong>尋求穩定，可能晚婚。</p>

      <h2 id="the-eighth-house">第八宮：轉化之宮</h2>
      <p>深水區。性、死亡、稅務和祕密。<br><strong>冥王星在第八宮：</strong>強大，有彈性，被深層吸引。</p>

      <h2 id="the-ninth-house">第九宮：智慧之宮</h2>
      <p>心智和視野的擴展。長途旅行和高等教育。<br><strong>木星在第九宮：</strong>旅行和學習的幸運兒。</p>

      <h2 id="the-tenth-house">第十宮：目標之宮</h2>
      <p>中天 (MC)。公眾聲譽和使命。<br><strong>太陽在第十宮：</strong>註定成為聚光燈下的焦點，雄心勃勃。</p>

      <h2 id="the-eleventh-house">第十一宮：社群之宮</h2>
      <p>社交網絡和團體。希望和人道主義目標。<br><strong>天王星在第十一宮：</strong>古怪的朋友，社會運動的領導者。</p>

      <h2 id="the-twelfth-house">第十二宮：潛意識之宮</h2>
      <p>黃道十二宮的「衣櫃」。隱藏的事物、靈性和業力。<br><strong>海王星在第十二宮：</strong>高度直覺，需要獨處。</p>

      <h2 id="stelliums">什麼是星群 (Stellium)？</h2>
      <p>**星群**是指 3 顆或更多行星聚集在一個宮位。這創造了巨大的能量焦點。顯示了你的靈魂在這一世集中能量的地方。</p>

      <h2 id="empty-houses">如果宮位是空的怎麼辦？宮主星的力量</h2>
      <p>空宮並不意味著該領域「缺失」。查看**宮主星**（守護宮頭星座的行星）。<br>例子：第七宮空宮在金牛座？看金星。</p>

      <h2 id="retrograde">宮位中的逆行行星</h2>
      <p>當行星在宮位中逆行時，其能量轉向內在。你可能會發展出對該主題的深刻內在掌握。</p>

      <h2 id="derived-houses">進階技巧：衍生宮位</h2>
      <p>你可以「旋轉」星盤來看其他人。<br><strong>第八宮：</strong>第七宮的第二宮（伴侶的錢）。<br><strong>第十一宮：</strong>第十宮的第二宮（事業的錢）。</p>

      <h2 id="progressions">推運宮位：生命週期如何演變</h2>
      <p>通過**次限推運**，你的宮頭會移動。你的推運太陽將在宮位中移動，標誌著 30 年的焦點篇章。</p>

      <h2 id="conclusion">整合你的星盤</h2>
      <p>理解 12 宮位將占星學從客廳遊戲轉變為人生地圖。在 Astralo，我們的報告為你綜合了這一點，不僅解釋你是*誰*，還解釋你要去*哪裡*。</p>
    `
};
