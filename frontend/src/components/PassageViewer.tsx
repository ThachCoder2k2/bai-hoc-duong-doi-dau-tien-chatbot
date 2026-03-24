import { useState, useCallback, useEffect } from 'react';
import { BookOpen, Volume2, Square, Pause, Play } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';
import { PASSAGE_TEXT } from '@/lib/passage';

type TtsState = 'idle' | 'speaking' | 'paused';

export default function PassageViewer() {
  const [ttsState, setTtsState] = useState<TtsState>('idle');

  // Sync state with speechSynthesis events
  useEffect(() => {
    const checkState = setInterval(() => {
      const synth = window.speechSynthesis;
      if (!synth.speaking && !synth.paused && ttsState !== 'idle') {
        setTtsState('idle');
      }
    }, 500);
    return () => {
      clearInterval(checkState);
      window.speechSynthesis.cancel();
    };
  }, [ttsState]);

  const handlePlay = useCallback(() => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(PASSAGE_TEXT);
    utterance.lang = 'vi-VN';
    utterance.rate = 0.85;
    utterance.pitch = 1;
    utterance.onend = () => setTtsState('idle');
    utterance.onerror = () => setTtsState('idle');
    window.speechSynthesis.speak(utterance);
    setTtsState('speaking');
  }, []);

  const handlePause = useCallback(() => {
    window.speechSynthesis.pause();
    setTtsState('paused');
  }, []);

  const handleResume = useCallback(() => {
    window.speechSynthesis.resume();
    setTtsState('speaking');
  }, []);

  const handleStop = useCallback(() => {
    window.speechSynthesis.cancel();
    setTtsState('idle');
  }, []);

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-cream relative">
      {/* Elegant Header */}
      <div className="h-16 border-b border-border/40 bg-white/50 backdrop-blur-md flex items-center px-8 justify-between shrink-0 absolute top-0 w-full z-10 transition-all">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-primary/5 flex items-center justify-center">
            <BookOpen className="w-4 h-4 text-primary/70" />
          </div>
          <div>
            <h1 className="font-serif font-medium text-lg text-slate-800">
              Bài học đường đời đầu tiên
            </h1>
            <p className="text-xs text-slate-500 font-sans uppercase tracking-widest mt-0.5">
              Dế Mèn phiêu lưu ký • Ngữ văn 6
            </p>
          </div>
        </div>

        {/* TTS Controls */}
        <div className="flex items-center gap-2">
          {ttsState === 'idle' ? (
            <button
              onClick={handlePlay}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 shadow-sm bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20"
            >
              <Volume2 className="w-4 h-4" />
              <span>Đọc to</span>
            </button>
          ) : (
            <>
              {/* Pause / Resume */}
              <button
                onClick={ttsState === 'speaking' ? handlePause : handleResume}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 shadow-sm ${
                  ttsState === 'speaking'
                    ? 'bg-amber-500 text-white hover:bg-amber-600 shadow-amber-200'
                    : 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-emerald-200'
                }`}
              >
                {ttsState === 'speaking' ? (
                  <>
                    <Pause className="w-3.5 h-3.5" />
                    <span>Tạm dừng</span>
                    <div className="flex items-end gap-0.5 h-3.5 ml-1">
                      <span
                        className="w-0.5 bg-white/80 rounded-full animate-[soundwave_0.5s_ease-in-out_infinite_alternate]"
                        style={{ height: '40%', animationDelay: '0ms' }}
                      />
                      <span
                        className="w-0.5 bg-white/80 rounded-full animate-[soundwave_0.5s_ease-in-out_infinite_alternate]"
                        style={{ height: '80%', animationDelay: '150ms' }}
                      />
                      <span
                        className="w-0.5 bg-white/80 rounded-full animate-[soundwave_0.5s_ease-in-out_infinite_alternate]"
                        style={{ height: '60%', animationDelay: '300ms' }}
                      />
                      <span
                        className="w-0.5 bg-white/80 rounded-full animate-[soundwave_0.5s_ease-in-out_infinite_alternate]"
                        style={{ height: '100%', animationDelay: '100ms' }}
                      />
                      <span
                        className="w-0.5 bg-white/80 rounded-full animate-[soundwave_0.5s_ease-in-out_infinite_alternate]"
                        style={{ height: '50%', animationDelay: '250ms' }}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5" />
                    <span>Tiếp tục</span>
                  </>
                )}
              </button>

              {/* Stop */}
              <button
                onClick={handleStop}
                className="flex items-center justify-center w-9 h-9 rounded-full bg-rose-500 text-white hover:bg-rose-600 transition-all duration-300 shadow-sm shadow-rose-200"
                title="Dừng đọc"
              >
                <Square className="w-3.5 h-3.5" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Reading Content */}
      <ScrollArea className="flex-1 w-full h-full pt-24 pb-16 px-6">
        <div className="max-w-prose mx-auto">
          <header className="mb-12 text-center">
            <h2 className="font-serif text-3xl text-slate-900 mb-4 font-semibold">
              Bài học đường đời đầu tiên
            </h2>
            <p className="text-slate-500 italic font-serif">
              Trích Dế Mèn phiêu lưu ký - Tô Hoài
            </p>
            <div className="w-12 h-px bg-slate-300 mx-auto mt-8"></div>
          </header>

          <div className="prose prose-slate prose-lg md:prose-xl mx-auto font-serif text-slate-800">
            <p>
              <span className="float-left text-5xl font-serif text-slate-900 leading-none pr-3 pt-2 font-bold">
                B
              </span>
              ởi tôi ăn uống điều độ và làm việc có chừng mực nên tôi chóng lớn
              lắm. Chẳng bao lâu, tôi đã trở thành một chàng dế thanh niên cường
              tráng. Đôi càng tôi mẫm bóng. Những cái vuốt ở chân, ở khoeo cứ
              cứng dần và nhọn hoắt. Thỉnh thoảng, muốn thử sự lợi hại của những
              chiếc vuốt, tôi co cẳng lên, đạp phanh phách vào các ngọn cỏ.
              Những ngọn cỏ gãy rạp, y như có nhát dao vừa lia qua. Đôi cánh
              tôi, trước kia ngắn hủn hoẳn bây giờ thành cái áo dài kín xuống
              tận chấm đuôi. Mỗi khi tôi vũ lên, đã nghe tiếng phành phạch giòn
              giã. Lúc tôi đi bách bộ thì cả người tôi rung rinh một màu nâu
              bóng mỡ soi gương được và rất ưa nhìn. Đầu tôi to ra và nổi từng
              tảng, rất bướng. Hai cái răng đen nhánh lúc nào cũng nhai ngoàm
              ngoạp như hai lưỡi liềm máy làm việc. Sợi râu tôi dài và uốn cong
              một vẻ rất đỗi hùng dũng. Tôi lấy làm hãnh diện với bà con về cặp
              râu ấy lắm. Cứ chốc chốc tôi lại trịnh trọng và khoan thai đưa cả
              hai chân lên vuốt râu.
            </p>

            <p>
              Tôi đi đứng oai vệ. Mỗi bước đi, tôi làm điệu dún dẩy các khoeo
              chân, rung lên rung xuống hai chiếc râu. Cho ra kiểu cách con nhà
              võ. Tôi tợn lắm. Dám cà khịa với tất cả mọi bà con trong xóm. Khi
              tôi to tiếng thì ai cũng nhịn, không ai đáp lại. Bởi vì quanh
              quẩn, ai cũng quen thuộc mình cả. Không nói, có lẽ họ nể hơn là
              sợ. Nhưng tôi lại tưởng thế là không ai dám ho he. Ấy vậy, tôi cho
              là tôi giỏi. Những gã xốc nổi thương lầm cử chỉ ngông cuồng là tài
              ba. Tôi đã khái quát mấy chị Cào Cào ngụ ngoài đầu bờ, khiến mỗi
              lần thấy tôi đi qua, các chị phải núp khuôn mặt trái xoan dưới
              nhánh cỏ, chỉ dám đưa mắt lên nhìn trộm. Thỉnh thoảng, tôi ngứa
              chân đã một cái, ghẹo anh Gọng Vó lấm láp vừa ngơ ngác dưới đầm
              lên. Tôi càng tưởng tôi là tay ghế gớm, có thể sắp đứng đầu thiên
              hạ rồi.
            </p>

            <p>
              Chao ôi, có biết đâu rằng: hung hăng, hống hách láo chỉ tổ đem
              thân mà trả nợ những cử chỉ ngu dại của mình thôi. Tôi đã phải
              trải cảnh như thế. Thoát nạn rồi, mà con ân hận quá, ân hận mãi.
              Thế mới biết, nếu đã trót không suy tính, lỡ xảy ra những việc dại
              dột, dù về sau có hối cũng không thể làm lại được.
            </p>

            <p className="text-center italic text-slate-600 my-8">
              Câu chuyện ân hận đầu tiên mà tôi ghi nhớ suốt đời.
            </p>

            <p>
              Bên hàng xóm tôi có cái hang của Dế Choắt. Dế Choắt là tên tôi đã
              đặt cho nó một cách chế giễu và trịch thượng thế. Choắt nọ có lẽ
              cũng trạc tuổi tôi. Nhưng vì Choắt bẩm sinh yếu đuối nên tôi coi
              thường và gã cũng sợ tôi lắm.
            </p>

            <p>
              Cái chàng Dế Choắt, người gầy gò và dài lêu nghêu như một gã
              nghiện thuốc phiện. Đã thanh niên rồi mà cánh chỉ ngắn củn đến
              giữa lưng, hở cả mạng sườn như người cởi trần mặc áo gi-lê. Đôi
              càng bè bè, nặng nề, trông đến xấu. Râu ria gì mà cụt có một mẩu,
              và mặt mũi thì lúc nào cũng ngẩn ngẩn ngơ ngơ. Đã vậy, tính nết
              lại ăn xổi ở thì (thật chỉ vì ốm đau luôn, không làm được), có một
              cái hang ở cũng chỉ bới nông sát mặt đất, không biết đào sâu rồi
              khoét ra nhiều ngach như hang tôi.
            </p>

            <p>
              Một hôm, tôi sang chơi, thấy trong nhà luộm thuộm, bề bộn, tôi
              bảo:
            </p>

            <p className="pl-6 border-l-2 border-slate-300">
              — Sao chú mày sinh sống cẩu thả quá như thế! Nhà cửa đầu mà tuềnh
              toàng. Ngộ có kẻ nào đến phá thì thật chú chết ngay đuôi! Này thử
              xem: khi chú chui vào tổ, lưng chú phải lồm cồm đụng sát lên tận
              mặt đất, làm cho ai trên vệ cỏ nhìn sang cũng biết chú đương đi
              đứng chỗ nào trong tổ. Phỏng thử có thằng chim Cắt nó nhòm thấy,
              nó tưởng mồi, nó mổ một phát, nhất định trúng giữa lưng chú, thì
              chú có mà đi đời! Ôi thôi, chú mày ơi! Chú mày có lớn mà chẳng có
              khôn.
            </p>

            <p>
              Ngẫm ra thì tôi chỉ nói lấy sương miệng tôi. Còn Dế Choắt than thở
              thế nào, tôi cũng không để tai. Hồi ấy, tôi có tính tự đắc, cứ
              miệng mình nói tai mình nghe chứ không biết nghe ai, thậm chí cũng
              chẳng để ý có ai nghe mình không.
            </p>

            <p>Dế Choắt trả lời tôi bằng một giọng rất buồn rầu:</p>

            <p className="pl-6 border-l-2 border-slate-300">
              — Thưa anh, em cũng muốn khôn nhưng khôn không được. Đụng đến việc
              làm em thở rồi, không còn hơi sức đâu mà đào bới nữa. Lắm khi em
              cũng nghĩ nỗi nhà cửa như thế này là nguy hiểm, nhưng em nghèo sức
              quá, em đã nghĩ ròng rã hàng mấy tháng cũng không biết làm thế
              nào. Hay là bây giờ em nghĩ thế này… Song anh có cho phép nói em
              mới dám nói…
            </p>

            <p>Rồi Dế Choắt loanh quanh, băn khoăn. Tôi phải bảo:</p>

            <p className="pl-6 border-l-2 border-slate-300">
              — Được, chú mình cứ nói thẳng thừng ra nào.
            </p>

            <p>Dế Choắt nhìn tôi mà rằng:</p>

            <p className="pl-6 border-l-2 border-slate-300">
              — Anh đã nghĩ thương em như thế thì hay là anh đào giúp cho em một
              cái ngách sang bên nhà anh, phòng khi tắt lửa tối đèn có đứa nào
              đến bắt nạt thì em chạy sang…
            </p>

            <p>
              Chưa nghe hết câu, tôi đã hếch răng lên, xì một hơi rõ dài. Rồi,
              với điệu bộ khinh khỉnh, tôi mắng:
            </p>

            <p className="pl-6 border-l-2 border-slate-300">
              — Hức! Thông ngách sang nhà ta? Dễ nghe nhỉ! Chú mày hôi như cú
              mèo thế này, ta nào chịu được. Thôi, im cái điệu hát mưa dầm sùi
              sụt ấy đi. Đào tổ nông thì cho chết!
            </p>

            <p>Tôi về, không một chút bận tâm.</p>

            <p>
              Một buổi chiều, tôi ra đứng cửa hang như mọi khi, xem hoàng hôn
              xuống. Bỗng thấy chị Cốc từ dưới mặt nước bay lên, đến đậu gần
              hang tôi, cách có mấy bước. Chừng rớ được món nào, vừa chén xong,
              chị ta tìm đến đứng chỗ mát rỉa lông, rỉa cánh và chùi mép.
            </p>

            <p>
              Tính tôi hay nghịch ranh. Chẳng bận đến tôi, tôi cũng nghĩ mưu
              trêu chị Cốc. Tôi cất tiếng gọi Dế Choắt. Nghe tiếng thửa, tôi
              hỏi:
            </p>

            <p className="pl-6 border-l-2 border-slate-300">
              — Chú mình muốn cùng tớ đùa vui không?
            </p>
            <p className="pl-6 border-l-2 border-slate-300">
              — Đùa trò gì? Em đương lên cơn hen đây, hừ hừ...
            </p>
            <p className="pl-6 border-l-2 border-slate-300">
              — Đùa chơi một tí.
            </p>
            <p className="pl-6 border-l-2 border-slate-300">
              — Hừ... hừ... Cái gì
            </p>
            <p className="pl-6 border-l-2 border-slate-300">
              — Con mụ Cốc kia kia.
            </p>

            <p>Dế Choắt ra cửa, hé mắt nhìn chị Cốc. Rồi hỏi tôi:</p>

            <p className="pl-6 border-l-2 border-slate-300">
              — Chị Cốc béo xù đứng trước cửa nhà ta ấy hả?
            </p>
            <p className="pl-6 border-l-2 border-slate-300">— Ừ.</p>
            <p className="pl-6 border-l-2 border-slate-300">
              — Thôi thôi... hừ hừ... Em xin vái cả sáu tay. Anh đừng trêu
              vào... Anh phải sợ...
            </p>

            <p>Tôi quắc mắt:</p>

            <p className="pl-6 border-l-2 border-slate-300">
              — Sợ gì? Mày bảo tao sợ cái gì? Mày bảo tao còn biết sợ ai hơn tao
              nữa!
            </p>
            <p className="pl-6 border-l-2 border-slate-300">
              – Thưa anh, thế thì,... hừ hừ... em xin sợ. Mời anh cứ đùa một
              mình thôi.
            </p>

            <p>Tôi lại mắng Dế Choắt và bảo:</p>

            <p className="pl-6 border-l-2 border-slate-300">
              — Giương mắt ra xem tạo trêu con mụ Cốc đây này.
            </p>

            <p>
              Tôi rình đến lúc chị Cốc rỉa cánh quay đầu lại phía cửa tổ tôi,
              tôi cất giọng véo von:
            </p>

            <p className="text-center italic font-medium my-6">
              Cái Cò, cái Vạc, cái Nông,
              <br />
              Ba cái cùng béo, vặt lông cái nào?
              <br />
              Vặt lông cái Cốc cho tạo,
              <br />
              Tao nấu, tao nướng, tao xào, tao ăn.
            </p>

            <p>
              Chị Cốc thoạt nghe tiếng hát từ trong đất văng vẳng lên, không
              hiểu như thế nào, giật nảy hai đầu cánh, muốn bay. Đến khi định
              thần lại, chị mới trợn tròn mắt, giương cánh lên như sắp đánh
              nhau. Chị lò dò về phía cửa hang tôi, hỏi:
            </p>

            <p className="pl-6 border-l-2 border-slate-300">
              — Đứa nào cạnh khoé gì tao thế? Đứa nào cạnh khoé gì tao thế?
            </p>

            <p>
              Tôi chui tọt ngay vào hang, lên giường nằm khểnh bắt chân chữ ngũ.
              Bụng nghĩ thú vị: "Mày thì mày cứ tức, mày ghè vỡ đầu mày ra cho
              nhỏ đi, nhỏ đến đâu thì mày cũng không chui nổi vào tổ tao đâu!".
            </p>

            <p>
              Một tai hoạ đến mà đứa ích kỉ thì không thể biết trước được. Đó
              là: không trông thấy tôi, nhưng chị Cốc đã trông thấy Dế Choắt
              đang loay hoay trong cửa hang. Chị Cốc liền quát lớn:
            </p>

            <p className="pl-6 border-l-2 border-slate-300">— Mày nói gì?</p>
            <p className="pl-6 border-l-2 border-slate-300">
              — Lạy chị, em nói gì đâu!
            </p>

            <p>Rồi Dế Choắt lủi vào:</p>

            <p className="pl-6 border-l-2 border-slate-300">
              — Chối hả? Chối này! Chối này!
            </p>

            <p>
              Mỗi câu "Chối này" chị Cốc lại giáng một mỏ xuống. Mỏ Cốc như cái
              dùi sắt, chọc xuyên cả đất. Rúc trong hang mà bị trúng hai mỏ,
              Choắt quẹo xương sống lăn ra kêu váng. Núp tận đáy đất mà tôi cũng
              khiếp, nằm im thít. Như đã hả cơn tức, chị Cốc đứng rỉa lông cánh
              một lát nữa rồi lại bay là xuống đầm nước, không chút để ý đến
              cảnh khổ đau vừa gây ra.
            </p>

            <p>
              Biết chị Cốc đi rồi, tôi mới mon men bò lên. Trông thấy tôi, Dế
              Choắt khóc thảm thiết.
            </p>

            <p>Tôi hỏi một câu ngớ ngẩn:</p>

            <p className="pl-6 border-l-2 border-slate-300">— Sao? Sao?</p>

            <p>
              Choắt không dậy được nữa, nằm thoi thóp. Thấy thế tôi hốt hoảng
              quỳ xuống, nâng đầu Choắt lên mà than rằng:
            </p>

            <p className="pl-6 border-l-2 border-slate-300">
              — Nào tôi đâu biết cơ sự lại ra nông nỗi này! Tôi hối lắm. Tôi hối
              hận lắm! Anh mà chết là chỉ tại cái tội ngông cuồng dại dột của
              tôi. Tôi biết làm thế nào bây giờ?
            </p>

            <p>Tôi không ngờ Dế Choắt nói với tôi một câu như thế này:</p>

            <p className="pl-6 border-l-2 border-slate-300 font-medium">
              — Thôi, tôi ốm yếu quá rồi, chết cũng được. Nhưng trước khi nhắm
              mắt, tôi khuyên anh: ở đời mà có thói hung hăng bậy bạ, có óc mà
              không biết nghĩ, sớm muộn rồi cũng mang vạ vào mình đấy.
            </p>

            <p>
              Thế rồi Dế Choắt tắt thở. Tôi thương lắm. Vừa thương vừa ăn năn
              tội mình. Giá tôi không trêu chị Cốc thì đâu đến nỗi Choắt việc
              gì. Cả tôi nữa, nếu không nhanh chân chạy vào hang thì tôi cũng
              chết toi rồi.
            </p>

            <p>
              Tôi đem xác Dế Choắt đến chôn vào một vùng cỏ bùm tum. Tôi đắp
              thành nấm mộ to. Tôi đứng lặng giờ lâu, nghĩ về bài học đường đời
              đầu tiên.
            </p>
          </div>

          <div className="w-12 h-px bg-slate-300 mx-auto mt-16 mb-8"></div>
        </div>
      </ScrollArea>
    </div>
  );
}
