import { BookOpen } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';

export default function PassageViewer() {
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
              Những ngọn cỏ gãy rạp, y như có nhát dao vừa lia qua.
            </p>
            <p>
              Đôi cánh tôi, trước kia ngắn hủn hoẳn, bây giờ thành cái áo dài
              kín xuống tận chấm đuôi. Mỗi khi tôi vũ lên, đã nghe tiếng phành
              phạch giòn giã. Lúc tôi đi bách bộ thì cả người tôi rung rinh một
              màu nâu bóng mỡ soi gương được và rất ưa nhìn. Đầu tôi to ra và
              nổi từng tảng, rất bướng. Hai cái răng đen nhánh lúc nào cũng nhai
              ngoàm ngoạp như hai lưỡi liềm máy làm việc. Sợi râu tôi dài và uốn
              cong một vẻ rất đỗi hùng dũng. Tôi lấy làm hãnh diện với bà con về
              cặp râu ấy lắm. Cứ chốc chốc tôi lại trịnh trọng và khoan thai đưa
              cả hai chân lên vuốt râu.
            </p>
            <p>
              Tôi đi đứng oai vệ. Mỗi bước đi, tôi làm điệu dún dẩy các khoeo
              chân, rung lên rung xuống hai chiếc râu. Cho ra kiểu cách con nhà
              võ. Tôi tợn lắm. Dám cà khịa với tất cả mọi bà con trong xóm. Khi
              tôi to tiếng thì ai cũng nhịn, không ai đáp lại. Bởi vì quanh
              quẩn, ai cũng quen thuộc mình cả. Không nói, có lẽ họ nể hơn là
              sợ. Nhưng tôi lại tưởng thế là không ai dám ho he. Ấy vậy, tôi cho
              là tôi giỏi. Những gã xốc nổi thường lầm cử chỉ ngông cuồng là tài
              ba.
            </p>
            <p>
              Tôi có một anh bạn ở ngay bên hàng xóm. Anh ta tên là Dế Choắt.
              Cái anh chàng Dế Choắt, người gầy gò và dài lêu nghêu như một gã
              nghiện thuốc phiện. Đã thanh niên rồi mà cánh chỉ ngắn củn đến
              giữa lưng, hở cả mạng sườn như người cởi trần mặc áo gi-lê. Đôi
              càng bè bè, nặng nề, trông đến xấu. Râu ria gì mà cụt có một mẩu
              và mặt mũi lúc nào cũng ngẩn ngẩn ngơ ngơ.
            </p>
            <p>
              Cái chàng Dế Choắt, cái tên tôi đặt cho, nghe thật đúng tính nết
              và hình dáng anh ta. Choắt là một chú dế xấu xí, lại bệnh hoạn.
              Hàng ngày, anh ta chui vào trong cái hang tối om và bẩn thỉu nằm
              co quắp. Hang của Choắt đào nông lắm; nông choèn choèn, chỉ bới
              độc một cửa, không có ngách, không phòng, không có gì cả. Đã ốm
              yếu, lại chỉ sống toàn bằng những thức ăn thừa thãi, rác rưởi.
            </p>
            <p>
              Có một buổi tối, tôi ra đứng ngoài cửa hang xem trăng. Bỗng nhận
              ra, gần đấy, một anh Dế Choắt đang loay hoay ở cửa hang. Tôi mon
              men bò lại gần. Ngoài đồng, gió thổi. Trăng rọi sáng trên đầu.
              Đêm nghe chừng lạnh lẽo thêm. Nhưng trông anh Dế Choắt ốm
              yếu, tong teo, tôi bỗng nảy ra ý thương hại. Tôi lên tiếng hỏi:
            </p>
            <p>
              — Sao chú mày không đào hang sâu hơn? Ở nông thế này, bất tiện.
            </p>
            <p>
              — Em yếu lắm. Em nghĩ không đào nổi. Vả lại, em cũng không biết
              đào.
            </p>
            <p>
              Tôi mắng:
            </p>
            <p>
              — Sao chú mày không biết lo nghĩ gì cả! Chú mày ơi, nếu không
              có nhà ở choàng choàng thế, nhỡ trời đổ mưa thì sao? Nhỡ ma bắt
              thì sao hả?
            </p>
            <p>
              Lời tôi xốc hơi. Tôi đã xốc đến nơi. Dế Choắt chịu không nổi,
              đấu dịu:
            </p>
            <p>
              — Anh ơi, em cũng muốn đào hang mà em chịu. Hay anh cho em
              đào một cái ngách sang nhà anh, nhỡ khi tối lửa tắt đèn em chạy
              sang...
            </p>
            <p>
              Tôi quắc mắt:
            </p>
            <p>
              — Hức! Thông ngách sang nhà ta? Dễ nghe nhỉ! Chú mày hôi như cú
              mèo thế này, ta nào chịu được. Thôi, im cái điệu hát mưa dầm
              sùi sụt ấy đi! Đào tổ nông thì cho chết!
            </p>
            <p>
              Tôi về, tôi nằm suy nghĩ. Nghĩ rồi, tôi bật gáy "trr...rrr..."
              một bài hát mới, nghe hay hay. Cái xã hội lớn quanh tôi, tôi quên
              mất. Tôi chỉ nghĩ đến mình. Thế rồi sóng gió ập đến.
            </p>
            <p>
              Vào một buổi chiều kia, tôi ra đứng trước cửa hang, ngạo
              nghễ nhìn quanh. Bỗng thấy chị Cốc đang bay. Thấy chị Cốc xinh
              đẹp, tôi muốn ra oai với Dế Choắt, bèn đe:
            </p>
            <p>
              — Này, chị Cốc! Chị Cốc béo xù! Mắt tròn xoe!
            </p>
            <p>
              Tôi quay lại, cười hả hê. Nhưng chị Cốc đã trông thấy. Chị
              lững thững bay đến trước cửa hang tôi. Tôi chui tọt vào hang.
              Chị Cốc tức lắm. Chị lùi lại một bước, nói:
            </p>
            <p>
              — Mày nói gì? — Rồi chị Cốc mổ. — Cốc! Cốc! Cốc!
            </p>
            <p>
              Chị Cốc mổ túi bụi, sục sạo quanh cửa hang tôi. Nhưng tôi chui
              sâu trong hang, chị không mổ tới. Chị mổ nhầm vào hang Dế Choắt!
              Bệnh tật, ốm yếu, Choắt không chui nổi sâu, nằm sát mặt đất.
              Mỗi phát mổ của chị Cốc trúng vào người Choắt. Choắt kêu
              thảm thiết:
            </p>
            <p>
              — Anh ơi! Em chết mất!
            </p>
            <p>
              Cho đến khi chị Cốc tức giận bay đi, tôi mới dám lò dò bò ra
              khỏi hang. Tôi mon men lại gần chỗ Dế Choắt nằm. Thấy nằm thoi
              thóp, ngắc ngoải. Choắt nức nở:
            </p>
            <p>
              — Nào tôi có dám nói gì đâu! Thấy chị Cốc đi qua, tôi, tôi chỉ
              muốn... Nhưng thôi... Tôi ốm yếu quá, tôi không sống nổi...
              Nhưng trước khi nhắm mắt, tôi khuyên anh... Ở đời mà có thói
              hung hăng bậy bạ, có óc mà không biết nghĩ, sớm muộn rồi cũng
              mang vạ vào mình đấy.
            </p>
            <p>
              Thế rồi Dế Choắt chết.
            </p>
            <p>
              Tôi đứng lặng giờ lâu trước xác Dế Choắt. Bây giờ thì tôi
              hối hận lắm. Sao trước đây tôi ngu muội, hợm hĩnh quá vậy! Dần
              dần, nước mắt tôi ứa ra. Tôi cảm thấy bị kim châm vào lương tâm.
              Bài học đường đời đầu tiên tôi ghi nhớ mãi.
            </p>
          </div>

          <div className="w-12 h-px bg-slate-300 mx-auto mt-16 mb-8"></div>
        </div>
      </ScrollArea>
    </div>
  );
}
