import re
import json

# Initialize a list to hold all vocabulary objects
all_vocabulary_items = []

# --- Data for Topic 1. Contracts ---
topic1_words = ["agreement (n)", "party (n)", "provision (n)", "clause (n)", "agree (v)", "obligate (v)", "sign (v)", "resolve (v)", "binding (adj)", "contractual (adj)", "legal (adj)", "legally (adv)"]
topic1_pronounce = ["/ə'gri.mənt/", "/pa:rti/", "/prǝ vızn/", "/klo:z/", "/ gri:/", "/'a:bligert/", "/sain/", "/rı za:lv/", "/'baındın/", "/kən'træktfuǝl/", "/'li.gl/", "/li:gəli/"]
topic1_meaning = ["một thỏa thuận chung, một hợp đồng", "một người hoặc một nhóm tham gia vào một hợp đồng", "điều kiện cụ thể trong một hợp đồng", "một phần trong hợp đồng", "có cùng quan điểm hoặc sự hiểu biết", "ràng buộc về mặt pháp lý hoặc đạo đức", "viết tên của bạn vào một tài liệu để thể hiện sự chấp thuận", "để tìm một giải pháp", "yêu cầu về mặt pháp lý", "liên quan đến hợp đồng", "được pháp luật cho phép", "theo cách được pháp luật cho phép"]

for i in range(len(topic1_words)):
    cleaned_word = re.sub(r'\s*\((n|v|adj|adv)\)$', '', topic1_words[i]).strip()
    all_vocabulary_items.append({
        "word": cleaned_word,
        "pronounce": topic1_pronounce[i],
        "meaning": topic1_meaning[i]
    })

# --- Data for Topic 2. Marketing ---
topic2_words = ["market (n)", "competition (n)", "strategy (n)", "customer (n)", "advertise (v)", "attract (v)", "consume (v)", "market (v)", "effective (adj)", "productive (adj)", "persuasive (adj)", "efficiently (adv)"]
topic2_pronounce = ["/ma:rkıt/", "/ka:mpǝ tin/", "/'strætǝdzi/", "/'kastəmər/", "/'ædvertaız/", "/ trækt/", "/kən su:m/", "/ ma:rkıt/", "/1'fektiv/", "/prǝ'dıktıv/", "/per sweısıv/", "/1'fıfəntli/"]
topic2_meaning = ["nhu cầu về một sản phẩm", "hoạt động cạnh tranh", "một kế hoạch hành động", "ai đó mua hàng hóa hoặc dịch vụ", "để quảng bá một sản phẩm hoặc dịch vụ", "để rút ra bằng cách kháng cáo", "sử dụng hoặc mua một sản phẩm", "để quảng bá và bán", "thành công trong việc tạo ra một kết quả mong muốn", "có thể sản xuất số lượng lớn", "giỏi thuyết phục người khác", "theo cách đạt được năng suất tối đa"]

for i in range(len(topic2_words)):
    cleaned_word = re.sub(r'\s*\((n|v|adj|adv)\)$', '', topic2_words[i]).strip()
    all_vocabulary_items.append({
        "word": cleaned_word,
        "pronounce": topic2_pronounce[i],
        "meaning": topic2_meaning[i]
    })

# --- Data for Topic 3. Warranties ---
topic3_words = ["warranty (n)", "defect (n)", "claim (n)", "coverage (n)", "guarantee (v)", "replace (v)", "refund (v)", "repair (v)", "defective (adj)", "valid (adj)", "expired (adj)", "promptly (adv)"]
topic3_pronounce = ["/ wɔ:renti/", "/'di:fekt/", "/klerm/", "/kaveridz/", "/ gærǝn'ti:/", "/rı' pleis/", "/'ri:fand/", "/Γι'ρεг/", "/dı'fektiv/", "/vælid/", "/ık'sparǝrd/", "/'pra:mptli/"]
topic3_meaning = ["một sự đảm bảo", "một lỗi hoặc sự không hoàn hảo", "một nhu cầu cho một cái gì đó do", "mức độ mà một cái gì đó được bảo hiểm", "cam kết về chất lượng sản phẩm", "thay thế", "trả lại tiền", "để sửa chữa hoặc khôi phục", "có lỗi", "được chấp nhận về mặt pháp lý", "không còn hiệu lực", "không chậm trễ"]

for i in range(len(topic3_words)):
    cleaned_word = re.sub(r'\s*\((n|v|adj|adv)\)$', '', topic3_words[i]).strip()
    all_vocabulary_items.append({
        "word": cleaned_word,
        "pronounce": topic3_pronounce[i],
        "meaning": topic3_meaning[i]
    })

# --- Data for Topic 4. Business Planning ---
topic4_words = ["goal (n)", "strategy (n)", "forecast (n)", "resource (n)", "forecast (v)", "plan (v)", "analyze (v)", "assess (v)", "strategic (adj)", "realistic (adj)", "achievable (adj)", "effectively (adv)"]
topic4_pronounce = ["/goul/", "/'strætǝdzi/", "/ fo:rkæst/", "/ ri:sors/", "/'fo:rkæst/", "/plæn/", "/'ænəlaız/", "/ǝses/", "/strǝ'ti:dzık/", "/ ri:ə'lıstık/", "/ətli vəbl/", "/1' fektivli/"]
topic4_meaning = ["một mục tiêu hoặc kết quả mong muốn", "một kế hoạch hành động", "một dự đoán", "một cổ phiếu hoặc nguồn cung cấp", "để dự đoán tương lai", "quyết định và sắp xếp", "để kiểm tra chi tiết", "để đánh giá hoặc ước tính", "liên quan đến kế hoạch dài hạn", "thực tế và có thể đạt được", "có khả năng thực hiện được", "theo cách đạt được kết quả mong muốn"]

for i in range(len(topic4_words)):
    cleaned_word = re.sub(r'\s*\((n|v|adj|adv)\)$', '', topic4_words[i]).strip()
    all_vocabulary_items.append({
        "word": cleaned_word,
        "pronounce": topic4_pronounce[i],
        "meaning": topic4_meaning[i]
    })

# --- Data for Topic 5. Conferences ---
topic5_words = ["attendee (n)", "schedule (n)", "location (n)", "venue (n)", "arrange (v)", "hold (v)", "participate (v)", "register (v)", "convenient (adj)", "scheduled (adj)", "confirmed (adj)", "international (adj)"]
topic5_pronounce = ["/ ten di:/", "/'skedzu:l/", "/lου kerſn/", "/'venju:/", "/ə'reind3/", "/hould/", "/pa:r'tısıpert/", "/'redzıster/", "/kən vi:niənt/", "/'skedzu:ld/", "/kən'f3:rmd/", "/ intə næſnel/"]
topic5_meaning = ["một người tham dự một cuộc họp", "kế hoạch sự kiện", "một địa điểm hoặc vị trí", "nơi diễn ra sự kiện", "lập kế hoạch và tổ chức", "tổ chức hoặc tiến hành", "tham gia", "để ghi danh hoặc đăng ký", "phù hợp tốt với nhu cầu của một người", "lên kế hoạch hoặc sắp xếp cho", "được thành lập hoặc xác minh", "quốc tế"]

for i in range(len(topic5_words)):
    cleaned_word = re.sub(r'\s*\((n|v|adj|adv)\)$', '', topic5_words[i]).strip()
    all_vocabulary_items.append({
        "word": cleaned_word,
        "pronounce": topic5_pronounce[i],
        "meaning": topic5_meaning[i]
    })

# --- Data for Topic 6. Computers ---
topic6_words = ["network (n)", "software (n)", "hardware (n)", "virus (n)", "access (v)", "install (v)", "upgrade (v)", "delete (v)", "digital (adj)", "compatible (adj)", "secure (adj)", "efficiently (adv)"]
topic6_pronounce = ["/netw3:rk/", "/softwer/", "/hardwer/", "/'varres/", "/'ækses/", "/in'sto:l/", "/'Apgreid/", "/dı'li:t/", "/dIdzıtl/", "/kəm pætəbl/", "/si kjur/", "/1'fıfəntli/"]
topic6_meaning = ["một nhóm các thiết bị được kết nối với nhau", "các chương trình được máy tính sử dụng", "các thành phần vật lý của máy tính", "một chương trình phần mềm độc hại", "để có được hoặc lấy", "để thiết lập phần mềm", "để cải thiện hoặc cập nhật", "để loại bỏ hoặc xóa", "liên quan đến việc sử dụng công nghệ máy tính", "có thể làm việc cùng nhau", "thoát khỏi nguy hiểm hoặc đe dọa", "theo cách đạt được năng suất tối đa"]

for i in range(len(topic6_words)):
    cleaned_word = re.sub(r'\s*\((n|v|adj|adv)\)$', '', topic6_words[i]).strip()
    all_vocabulary_items.append({
        "word": cleaned_word,
        "pronounce": topic6_pronounce[i],
        "meaning": topic6_meaning[i]
    })

# --- Data for Topic 7. Office Technology ---
topic7_words = ["printer (n)", "scanner (n)", "photocopier (n)", "fax (n)", "operate (v)", "print (v)", "copy (v)", "scan (v)", "functional (adj)", "advanced (adj)", "operational (adj)", "automatically (adv)"]
topic7_pronounce = ["/'printer/", "/'skænǝr/", "/ foutou ka pier/", "/fæks/", "/'a:perext/", "/print/", "/'ka:pi/", "/skæn/", "/fankfǝnl/", "/ǝd'vænst/", "/ a pə'reıfənl/", "/   tə mætıkli/"]
topic7_meaning = ["một máy in tài liệu", "một thiết bị quét tài liệu", "một cái máy tạo ra các bản sao giấy", "một máy gửi tài liệu qua đường dây điện thoại", "để điều khiển chức năng của", "để tạo ra văn bản hoặc hình ảnh bằng văn bản trên giấy", "để tạo một bản sao", "để chuyển đổi một tài liệu sang dạng kỹ thuật số", "thiết thực và hữu ích", "phát triển cao hoặc phức tạp", "trong tình trạng làm việc", "thực hiện mà không có sự can thiệp của con người"]

for i in range(len(topic7_words)):
    cleaned_word = re.sub(r'\s*\((n|v|adj|adv)\)$', '', topic7_words[i]).strip()
    all_vocabulary_items.append({
        "word": cleaned_word,
        "pronounce": topic7_pronounce[i],
        "meaning": topic7_meaning[i]
    })

# --- Data for Topic 8. Office Procedures ---
topic8_words = ["procedure (n)", "policy (n)", "document (n)", "file (n)", "follow (v)", "file (v)", "organize (v)", "implement (v)", "systematic (adj)", "efficient (adj)", "official (adj)", "normally (adv)"]
topic8_pronounce = ["/prəsi:dzər/", "/'pa:ləsi/", "/'da:kjəmənt/", "/fail/", "'/fa:lou/", "/fail/", "/'organaız/", "/'Implı, ment/", "/ siste mætık/", "/1'fıfənt/", "/  fısǝl/", "/fo:məli/"]
topic8_meaning = ["một chuỗi các hành động đượC thực hiện theo một trình tự nhất định", "một quá trình hành động được thông qua bởi một doanh nghiệp", "một mẫu văn bản, bản in hoặc điện tử", "một bộ sưu tập tài liệu", "theo sau hoặc theo sau", "để lưu trữ ở một nơi để dễ dàng truy cập", "sắp xếp một cách có cấu trúc", "đưa vào hành động", "thực hiện theo kế hoạch", "đạt được năng suất tối đa với nỗ lực lãng phí tối thiểu", "được ủy quyền hoặc phê duyệt bởi người có thẩm quyền", "theo cách thông trang trọng"]

for i in range(len(topic8_words)):
    cleaned_word = re.sub(r'\s*\((n|v|adj|adv)\)$', '', topic8_words[i]).strip()
    all_vocabulary_items.append({
        "word": cleaned_word,
        "pronounce": topic8_pronounce[i],
        "meaning": topic8_meaning[i]
    })

# --- Data for Topic 9. Electronics ---
topic9_words = ["device (n)", "component (n)", "circuit (n)", "voltage (n)", "transmit (v)", "convert (v)", "install (v)", "operate (v)", "electronic (adj)", "digital (adj)", "automated (adj)", "sophisticated (adj)"]
topic9_pronounce = ["/di'vais/", "/kəm pounənt/", "/s3:rkıt/", "/'voultid 3/", "/træns mit/", "/kən'v3:rt/", "/in'sto:l/", "/'a:perext/", "/1 lek'tra:nık/", "/dId31tl/", "/' :tə, mertıd/", "/sə fıstıkeıtıd/"]
topic9_meaning = ["một thiết bị được chế tạo cho một mục đích cụ thể", "một phần hoặc thành phần của một hệ thống lớn hơn", "một đường dẫn kín cho dòng điện", "một lực điện", "để gửi tín hiệu điện tử", "để thay đổi hình thức của một cái gì đó", "để thiết lập thiết bị hoặc phần mềm", "để điều khiển hoạt động của một thiết bị", "liên quan đến các thiết bị hoặc mạch chạy bằng điện", "liên quan đến hoặc liên quan đến công nghệ sử dụng số nhị phân", "vận hành bằng thiết bị tự động", "theo cách phức tạp"]

for i in range(len(topic9_words)):
    cleaned_word = re.sub(r'\s*\((n|v|adj|adv)\)$', '', topic9_words[i]).strip()
    all_vocabulary_items.append({
        "word": cleaned_word,
        "pronounce": topic9_pronounce[i],
        "meaning": topic9_meaning[i]
    })

# --- Data for Topic 10. Correspondence ---
topic10_words = ["letter (n)", "email (n)", "memo (n)", "recipient (n)", "compose (v)", "send (v)", "receive (v)", "reply (v)", "formal (adj)", "urgent (adj)", "brief (adj)", "annually (adv)"]
topic10_pronounce = ["/'letər/", "/ i:merl/", "/'memou/", "/rı'sıpiənt/", "/kəm pouz/", "/send/", "/ri'si:v/", "/rı' plai/", "/fo:rml/", "/ 3:rdzənt/", "/bri:f/", "/'ænjuǝli/"]
topic10_meaning = ["một giao tiếp bằng văn bản hoặc in", "thư điện tử", "một tin nhắn bằng văn bản", "một người nhận được một cái gì đó", "để tạo hoặc viết", "khiến phải đi hoặc bị bắt", "để có được hoặc được cho", "để trả lời bằng lời nói hoặc văn bản", "tuân theo các quy ước đã được thiết lập", "yêu cầu hành động hoặc sự chú ý ngay lập tức", "ngắn trong thời gian hoặc mức độ", "hàng năm"]

for i in range(len(topic10_words)):
    cleaned_word = re.sub(r'\s*\((n|v|adj|adv)\)$', '', topic10_words[i]).strip()
    all_vocabulary_items.append({
        "word": cleaned_word,
        "pronounce": topic10_pronounce[i],
        "meaning": topic10_meaning[i]
    })

# --- Data for Topic 11. Job Advertising and Recruiting ---
topic11_words = ["candidate (n)", "resume (n)", "vacancy (n)", "qualification (n)", "recruit (v)", "advertise (v)", "apply (v)", "shortlist (v)", "suitable (adj)", "experienced (adj)", "competitive (adj)", "successfully (adv)"]
topic11_pronounce = ["/'kændı, dext/", "/'rezjumer/", "/'verkənsi/", "/ kwa:lıfı kersn/", "/rı kru:t/", "/'ædvertaız/", "/ə'plar/", "/fo:rt.list/", "/'su:təbl/", "/ık spiriǝnst/", "/kəm petǝtıv/", "/sək sesfəli/"]
topic11_meaning = ["một người đang xin việc", "một tài liệu tóm tắt kinh nghiệm làm việc và trình độ của một người", "một vị trí hoặc công việc trống", "một kỹ năng hoặc kinh nghiệm cần thiết cho một công việc", "để tìm và tuyển dụng những ứng viên phù hợp", "để thúc đẩy việc mở việc làm", "để thực hiện một yêu cầu chính thức cho một công việc", "để chọn một số lượng nhỏ các ứng cử viên từ tất cả các ứng viên", "thích hợp cho một công việc hoặc vai trò cụ thể", "có kiến thức hoặc kỹ năng từ thực hành hoặc kinh nghiệm", "đặc trưng bởi sự cạnh tranh", "theo cách đạt được kết quả mong muốn"]

for i in range(len(topic11_words)):
    cleaned_word = re.sub(r'\s*\((n|v|adj|adv)\)$', '', topic11_words[i]).strip()
    all_vocabulary_items.append({
        "word": cleaned_word,
        "pronounce": topic11_pronounce[i],
        "meaning": topic11_meaning[i]
    })

# --- Data for Topic 12. Applying and Interviewing ---
topic12_words = ["application (n)", "interview (n)", "reference (n)", "portfolio (n)", "apply (v)", "interview (v)", "evaluate (v)", "prepare (v)", "confident (adj)", "professional (adj)", "suitable (adj)", "thoroughly (adv)"]
topic12_pronounce = ["/æplı kerſn/", "/'ınter vju:/", "/refrəns/", "/po:rt fouliou/", "/ə'plaı/", "/'inter vju:/", "/1'væljuert/", "/pri per/", "/ka:nfıdənt/", "/prǝ fefənl/", "/su:təbl/", "/'03/:rοuli/"]
topic12_meaning = ["một yêu cầu chính thức cho việc làm", "một cuộc họp để thẩm vấn người xin việc", "một người có thể giới thiệu một ứng cử viên", "một bộ sưu tập các mẫu công việc", "để thực hiện một yêu cầu chính thức cho một công việc", "để hỏi người xin việc", "để đánh giá giá trị hoặc chất lượng", "chuẩn bị sẵn sàng cho một mục đích cụ thể", "có sự tự tin", "liên quan đến hoặc phù hợp với một nghề nghiệp", "thích hợp cho một vai trò hoặc tình huống cụ thể", "một cách đầy đủ và chi tiết"]

for i in range(len(topic12_words)):
    cleaned_word = re.sub(r'\s*\((n|v|adj|adv)\)$', '', topic12_words[i]).strip()
    all_vocabulary_items.append({
        "word": cleaned_word,
        "pronounce": topic12_pronounce[i],
        "meaning": topic12_meaning[i]
    })

# --- Data for Topic 13. Hiring and Training ---
topic13_words = ["hire (n)", "orientation (n)", "training (n)", "probation (n)", "hire (v)", "train (v)", "coach (v)", "mentor (v)", "skilled (adj)", "experienced (adj)", "knowledgeable (adj)", "adequately (adv)"]
topic13_pronounce = ["/ harer/", "/ :rien texfn/", "/'treinin/", "/prou beijn/", "/'harer/", "/trein/", "/kouts/", "/mento:r/", "/skıld/", "/ık'spiriǝnst/", "/'nplıdzəbl/", "/'ædıkwətli/"]
topic13_meaning = ["một người đã được tuyển dụng", "buổi giới thiệu dành cho nhân viên mới", "quá trình học các kỹ năng mới", "thời gian thử việc cho nhân viên mới", "tuyển dụng ai đó", "để dạy hoặc phát triển kỹ năng", "để hướng dẫn và hướng dẫn", "để tư vấn hoặc đào tạo một ai đó", "có khả năng làm tốt điều gì đó", "đã đạt được kiến thức hoặc kỹ năng", "được thông tin và giáo dục tốt", "theo cách đầy đủ"]

for i in range(len(topic13_words)):
    cleaned_word = re.sub(r'\s*\((n|v|adj|adv)\)$', '', topic13_words[i]).strip()
    all_vocabulary_items.append({
        "word": cleaned_word,
        "pronounce": topic13_pronounce[i],
        "meaning": topic13_meaning[i]
    })

# --- Data for Topic 14. Salaries and Benefits ---
topic14_words = ["salary (n)", "benefit (n)", "compensation (n)", "deduction (n)", "earn (v)", "negotiate (v)", "contribute (v)", "increase (v)", "generous (adj)", "competitive (adj)", "additional (adj)", "significantly (adv)"]
topic14_pronounce = ["/'sæləri/", "/'benifit/", "/kompensersn/", "/dı'dak n/", "/3:rn/", "/nı goufiert/", "/kən trıbju:t/", "/ın kri:s/", "/'dzenǝrǝs/", "/kəm petǝtıv/", "/ ə'dışənl/", "/sıg'nıfıkəntli/"]
topic14_meaning = ["một khoản thanh toán cố định thường xuyên cho công việc", "một lợi thế hoặc lợi nhuận thu được từ việc làm", "cái gì đó, thường là tiền, được trao cho ai đó vì công việc", "một số tiền được trừ vào tiền lương", "nhận tiền để đổi lấy công việc", "để thảo luận về các điều khoản và điều kiện", "đưa (tiền hoặc nguồn lực) cho cái gì đó", "để trở thành hoặc làm cho lớn hơn", "sẵn sàng cho đi nhiều hơn", "có sự cạnh tranh mạnh mẽ", "thêm hoặc bổ sung", "một cách đủ lớn hoặc quan trọng"]

for i in range(len(topic14_words)):
    cleaned_word = re.sub(r'\s*\((n|v|adj|adv)\)$', '', topic14_words[i]).strip()
    all_vocabulary_items.append({
        "word": cleaned_word,
        "pronounce": topic14_pronounce[i],
        "meaning": topic14_meaning[i]
    })

# --- Data for Topic 15. Promotions, Pensions, and Awards ---
topic15_words = ["promotion (n)", "pension (n)", "award (n)", "recognition (n)", "promote (v)", "award (v)", "retire (v)", "achieve (v)", "deserving (adj)", "eligible (adj)", "outstanding (adj)", "legally (adv)"]
topic15_pronounce = ["/prǝ moun/", "'/ /", "/ word/", "/ rekǝg nıfn/", "/prǝ mout/", "/ word/", "/rı' tarǝr/", "/ǝtfi:v/", "/di'z3:rvin/", "/'elıdzəbl/", "/aut'stændın/", "/'li gəli/"]
topic15_meaning = ["chuyển lên cấp bậc hoặc vị trí cao hơn", "một khoản thanh toán thường xuyên được thực hiện trong thời gian nghỉ hưu", "một giải thưởng hoặc sự công nhận cho thành tích", "sự thừa nhận hoặc đánh giá cao", "để thăng tiến trong cấp bậc hoặc vị trí", "trao giải thưởng hoặc sự công nhận", "rời bỏ công việc của một người và ngừng làm việc", "để đạt được một mục tiêu hoặc tiêu chuẩn", "xứng đáng với cái gì đó", "đủ điều kiện hoặc được phép", "đặc biệt tốt", "phù hợp với luật pháp"]

for i in range(len(topic15_words)):
    cleaned_word = re.sub(r'\s*\((n|v|adj|adv)\)$', '', topic15_words[i]).strip()
    all_vocabulary_items.append({
        "word": cleaned_word,
        "pronounce": topic15_pronounce[i],
        "meaning": topic15_meaning[i]
    })

# --- Data for Topic 16. Shopping ---
topic16_words = ["product (n)", "price (n)", "discount (n)", "customer (n)", "purchase (v)", "browse (v)", "bargain (v)", "return (v)", "affordable (adj)", "available (adj)", "competitive (adj)", "economically (adv)"]
topic16_pronounce = ["/'prodʌkt/", "/prais/", "/diskaunt/", "/kastəmər/", "/ p3:rtfǝs/", "/brauz/", "/'ba:rgın/", "/r1't3:rn/", "/ fərdəbl/", "/ə'veıləbl/", "/kəm'petǝtıv/", "/ ɛkə'nomıkli/"]
topic16_meaning = ["một mặt hàng được chào bán", "số tiền cần thiết cho một sản phẩm", "giảm giá", "một người mua hàng hóa hoặc dịch vụ", "mua cái gì đó", "nhìn vào các đồ vật một cách tinh CỜ", "thương lượng giá của cái gì đó", "trả lại thứ gì đó đã mua", "giá cả hợp lý", "có thể được sử dụng hoặc thu được", "được định giá hoặc được thiết kế để cạnh tranh với những người khác", "theo cách liên quan đến nền kinh tế"]

for i in range(len(topic16_words)):
    cleaned_word = re.sub(r'\s*\((n|v|adj|adv)\)$', '', topic16_words[i]).strip()
    all_vocabulary_items.append({
        "word": cleaned_word,
        "pronounce": topic16_pronounce[i],
        "meaning": topic16_meaning[i]
    })

# --- Data for Topic 17. Ordering Supplies ---
topic17_words = ["supplier (n)", "inventory (n)", "order (n)", "shipment (n)", "order (v)", "deliver (v)", "restock (v)", "fulfill (v)", "sufficient (adj)", "available (adj)", "backordered (adj)", "conveniently (adv)"]
topic17_pronounce = ["/sə'plazər/", "/'inventori/", "/ order/", "/fıpmənt/", "/ order/", "/dı'lıvər/", "/ ri: stok/", "/ful frl/", "/sə fısnt/", "/ə'verləbl/", "/'bæk, :rdərd/", "/kən vi:niəntli/"]
topic17_meaning = ["một công ty cung cấp hàng hóa hoặc dịch vụ", "một danh sách đầy đủ các hàng hóa trong kho", "một yêu cầu về hàng hóa hoặc dịch VỤ", "hàng hóa được gửi", "để yêu cầu hàng hóa hoặc dịch vụ", "đưa hàng hóa tới một địa điểm", "để bổ sung nguồn cung hàng hóa", "để hoàn thành hoặc đáp ứng một đơn đặt hàng", "đủ đáp ứng nhu cầu", "sẵn sàng để sử dụng hoặc mua", "đã đặt hàng nhưng chưa có", "thực hiện thuận tiện"]

for i in range(len(topic17_words)):
    cleaned_word = re.sub(r'\s*\((n|v|adj|adv)\)$', '', topic17_words[i]).strip()
    all_vocabulary_items.append({
        "word": cleaned_word,
        "pronounce": topic17_pronounce[i],
        "meaning": topic17_meaning[i]
    })

# --- Data for Topic 18. Shipping ---
topic18_words = ["cargo (n)", "freight (n)", "shipment (n)", "warehouse (n)", "ship (v)", "deliver (v)", "track (v)", "package (v)", "international (adj)", "domestic (adj)", "express (adj)", "instantly (adv)"]
topic18_pronounce = ["/'ka:rgou/", "/frert/", "/ fıpment/", "/'werhaus/", "/fIp/", "/dı'lıvər/", "/træk/", "/'pækıd3/", "/ inter næfənl/", "/deǝ'mestik/", "/Ik'spres/", "/Instantli/"]
topic18_meaning = ["hàng hóa vận chuyển trên tàu, máy bay hoặc xe cơ giới", "hàng hóa vận chuyển số lượng lớn", "một lô hàng được gửi bằng tàu, máy bay hoặc xe tải", "một tòa nhà lớn nơi lưu trữ hàng hóa", "gửi hàng bằng phương thức vận tải", "đưa hàng hóa tới nơi đến", "để theo dõi sự tiến bộ của một cái gì đó", "xếp hàng hóa vào container để vận chuyển", "giữa hoặc liên quan đến các quốc gia khác nhau", "trong một quốc gia cụ thể", "nhanh chóng và trực tiếp", "thực hiện ngay lập tức"]

for i in range(len(topic18_words)):
    cleaned_word = re.sub(r'\s*\((n|v|adj|adv)\)$', '', topic18_words[i]).strip()
    all_vocabulary_items.append({
        "word": cleaned_word,
        "pronounce": topic18_pronounce[i],
        "meaning": topic18_meaning[i]
    })

# --- Data for Topic 19. Invoices ---
topic19_words = ["invoice (n)", "bill (n)", "payment (n)", "receipt (n)", "issue (v)", "charge (v)", "pay (v)", "settle (v)", "outstanding (adj)", "overdue (adj)", "accurate (adj)", "certified (adj)"]
topic19_pronounce = ["/'INVOIS/", "/bil/", "/'peimənt/", "/rı si:t/", "/ Ifu:/", "/tfa:rd3/", "/per/", "/setl/", "/aut stændın/", "/ouver du:/", "/'ækjərət/", "/s3:tıfard/"]
topic19_meaning = ["một tài liệu liệt kê hàng hóa hoặc dịch vụ được cung cấp và chi phí của chúng", "một báo cáo về số tiền nợ hàng hóa hoặc dịch vụ", "hành động trả tiền", "một tài liệu xác nhận thanh toán", "để cung cấp hoặc phân phối một cái gì đó chính thức", "để yêu cầu tiền như một mức giá cho hàng hóa hoặc dịch vụ", "để đưa tiền cho hàng hóa hoặc dịch vụ", "để trả những gì còn nợ", "chưa được thanh toán, giải quyết hoặc giải quyết", "không được thanh toán đúng thời gian dự kiến", "đúng và không có lỗi", "được chứng nhận"]

for i in range(len(topic19_words)):
    cleaned_word = re.sub(r'\s*\((n|v|adj|adv)\)$', '', topic19_words[i]).strip()
    all_vocabulary_items.append({
        "word": cleaned_word,
        "pronounce": topic19_pronounce[i],
        "meaning": topic19_meaning[i]
    })

# --- Data for Topic 20. Inventory ---
topic20_words = ["inventory (n)", "stock (n)", "warehouse (n)", "supply (n)", "count (v)", "check (v)", "update (v)", "track (v)", "dispose (v)", "remain (v)", "temporarily (adv)", "consistently (adv)"]
topic20_pronounce = ["/'ınvən to:ri/", "/stpk/", "/'werhaus/", "/sə'plar/", "/kaunt/", "/tfek/", "/ ap'dert/", "/træk/", "/dı spauz/", "/rı'mein/", "/'temprǝrǝli/", "/kən sıstəntli/"]
topic20_meaning = ["một danh sách đầy đủ các hàng hóa trong kho", "hàng hóa có sẵn để bán hoặc sử dụng", "một tòa nhà nơi hàng hóa được lưu trü", "một số lượng của một cái gì đó có sẵn để sử dụng", "để xác định tổng số mặt hàng", "để kiểm tra hoặc kiểm tra", "để mang lại một cái gì đó cập nhật", "để theo dõi sự chuyển động hoặc tiến bộ của một cái gì đó", "loại bỏ", "còn lại", "một cách tạm thời", "một cách đáng tin cậy và ổn định"]

for i in range(len(topic20_words)):
    cleaned_word = re.sub(r'\s*\((n|v|adj|adv)\)$', '', topic20_words[i]).strip()
    all_vocabulary_items.append({
        "word": cleaned_word,
        "pronounce": topic20_pronounce[i],
        "meaning": topic20_meaning[i]
    })

# --- Data for Topic 21. Banking ---
topic21_words = ["account (n)", "deposit (n)", "balance (n)", "transaction (n)", "withdraw (v)", "deposit (v)", "transfer (v)", "lend (v)", "sufficient (adj)", "secure (adj)", "financial (adj)", "online (adj)"]
topic21_pronounce = ["/ə'kaunt/", "/dı pozit/", "/'bæləns/", "/træn zæk n/", "/WIð dro:/", "/dı'pDzIt/", "/ trænsfer/", "/lend/", "/sə fısnt/", "/si kjur/", "/far nænjl/", "/ pn'lain/"]
topic21_meaning = ["hồ sơ giao dịch tài chính", "tiền được gửi vào ngân hàng", "số tiền trong tài khoản", "một ví dụ về mua hoặc bán", "rút tiền ra khỏi tài khoản", "để gửi tiền vào tài khoản", "chuyển tiền từ tài khoản này sang tài khoản khác", "đưa tiền cho ai đó với mong muốn được trả nợ", "đủ đáp ứng nhu cầu", "được bảo vệ khỏi rủi ro hoặc nguy hiểm", "liên quan đến tiền bạc hoặc tài chính", "trực tuyến"]

for i in range(len(topic21_words)):
    cleaned_word = re.sub(r'\s*\((n|v|adj|adv)\)$', '', topic21_words[i]).strip()
    all_vocabulary_items.append({
        "word": cleaned_word,
        "pronounce": topic21_pronounce[i],
        "meaning": topic21_meaning[i]
    })

# --- Data for Topic 22. Accounting ---
topic22_words = ["ledger (n)", "budget (n)", "expense (n)", "audit (n)", "audit (v)", "calculate (v)", "record (v)", "reconcile (v)", "accurate (adj)", "consistent (adj)", "fiscal (adj)", "meticulously (adv)"]
topic22_pronounce = ["/'ledzer/", "/'badzit/", "/ik'spens/", "/o:dit/", "/o:dit/", "/'kælkjulert/", "/rekord/", "/'rekənsaıl/", "/'ækjərət/", "/kən'sıstənt/", "/'fıskǝl/", "/mə'tıkjuləsli/"]
topic22_meaning = ["một cuốn sách hoặc bộ sưu tập tài khoản tài chính khác", "ước tính thu nhập và chi tiêu", "tiền chỉ cho cái gì đó", "kiểm tra chính thức các tài khoản", "tiến hành kiểm tra tài chính chính thức", "để xác định số lượng hoặc số lượng", "để ghi lại các giao dịch tài chính", "để làm cho các tài khoản tài chính nhất quán", "đúng và không có lỗi", "luôn hành động hoặc cư xử theo cùng một cách", "liên quan đến vấn đề tài chính", "một cách rất cần thận và chính xác"]

for i in range(len(topic22_words)):
    cleaned_word = re.sub(r'\s*\((n|v|adj|adv)\)$', '', topic22_words[i]).strip()
    all_vocabulary_items.append({
        "word": cleaned_word,
        "pronounce": topic22_pronounce[i],
        "meaning": topic22_meaning[i]
    })

# --- Data for Topic 23. Investments ---
topic23_words = ["asset (n)", "portfolio (n)", "bond (n)", "stock (n)", "invest (v)", "diversify (v)", "risk (v)", "allocate (v)", "profitable (adj)", "secure (adj)", "speculative (adj)", "strategically (adv)"]
topic23_pronounce = ["/'æset/", "/po:rt fouliou/", "/bond/", "/stpk/", "/in vest/", "/dar v3:rsıfar/", "/risk/", "/'/æləkert/", "/'profitəbl/", "/si kjur/", "/'spekjulətıv/", "/strǝ'ti:dzıkli/"]
topic23_meaning = ["một tài nguyên thuộc sở hữu của một người hoặc công ty", "một loạt các khoản đầu tư được nắm giữ bởi một cá nhân hoặc tổ chức", "một công cụ thu nhập cố định đại diện cho một khoản vay", "một phần quyền sở hữu trong một công ty", "phân bổ tiền với kỳ vọng thu được lợi nhuận trong tương lai", "để dàn trải đầu tư vào các tài sản khác nhau", "để gặp nguy hiểm hoặc mất mát", "để phân phối nguồn lực hoặc nhiệm vụ", "mang lại lợi ích tài chính", "không có rủi ro hoặc nguy hiểm", "có nguy cơ mất mát cao", "theo cách liên quan đến kế hoạch dài hạn"]

for i in range(len(topic23_words)):
    cleaned_word = re.sub(r'\s*\((n|v|adj|adv)\)$', '', topic23_words[i]).strip()
    all_vocabulary_items.append({
        "word": cleaned_word,
        "pronounce": topic23_pronounce[i],
        "meaning": topic23_meaning[i]
    })

# --- Data for Topic 24. Taxes ---
topic24_words = ["tax (n)", "deduction (n)", "refund (n)", "liability (n)", "file (v)", "deduct (v)", "withhold (v)", "calculate (v)", "taxable (adj)", "deductible (adj)", "exempt (adj)", "accurately (adv)"]
topic24_pronounce = ["/tæks/", "/dı'dak n/", "/ri:fand/", "/larə bılıti/", "/fail/", "/dı'dakt/", "/ hould/", "/'kælkjulert/", "/'tæksəbl/", "/dı'daktəbl/", "/1g'zempt/", "/'ækjərətli/"]
topic24_meaning = ["đóng góp bắt buộc vào nguồn thu ngân sách nhà nước", "một khoản được trừ vào thu nhập để giảm thu nhập chịu thuế", "tiền bị trả lại do thanh toán quá mức", "trách nhiệm pháp lý về việc nộp thuế", "nộp tờ khai thuế", "trừ đi tổng số", "giữ lại một phần thu nhập để đóng thuế", "để xác định số thuế phải nộp", "phải chịu thuế", "có thể được khấu trừ khỏi thu nhập chịu thuế", "không có nghĩa vụ hoặc trách nhiệm pháp lý", "một cách chính xác hoặc chính xác"]

for i in range(len(topic24_words)):
    cleaned_word = re.sub(r'\s*\((n|v|adj|adv)\)$', '', topic24_words[i]).strip()
    all_vocabulary_items.append({
        "word": cleaned_word,
        "pronounce": topic24_pronounce[i],
        "meaning": topic24_meaning[i]
    })

# --- Data for Topic 25. Financial Statements ---
topic25_words = ["statement (n)", "balance sheet (n)", "income statement (n)", "revenue (n)", "report (v)", "audit (v)", "analyze (v)", "compile (v)", "financial (adj)", "accurate (adj)", "detailed (adj)", "regularly (adv)"]
topic25_pronounce = ["/'stertmənt/", "/ bæləns fi:t/", "/Inkam stertment/", "/'revə nju:/", "/r1'pɔ:rt/", "/o:dit/", "/'ænə laız/", "/kəm paıl/", "/far'nænjl/", "/'ækjərət/", "/ di:terld/", "/'regjulərli/"]
topic25_meaning = ["một tài liệu hiển thị chi tiết tài chính", "báo cáo về tài sản, nợ phải trả và vốn", "một tài liệu cho thấy thu nhập và chi phí", "thu nhập từ hoạt động kinh doanh thông thường", "để đưa ra một tài khoản nói hoặc viết về một cái gì đó", "để kiểm tra báo cáo tài chính", "để kiểm tra dữ liệu để ra quyết định", "để thu thập và tổ chức thông tin", "liên quan đến tiền bạc hoặc tài chính", "đúng và không có lỗi", "có nhiều phần nhỏ hoặc sự kiện", "theo những khoảng thời gian nhất quán"]

for i in range(len(topic25_words)):
    cleaned_word = re.sub(r'\s*\((n|v|adj|adv)\)$', '', topic25_words[i]).strip()
    all_vocabulary_items.append({
        "word": cleaned_word,
        "pronounce": topic25_pronounce[i],
        "meaning": topic25_meaning[i]
    })

# --- Data for Topic 26. Property and Departments ---
topic26_words = ["property (n)", "lease (n)", "tenant (n)", "landlord (n)", "rent (n)", "manage (v)", "occupy (v)", "renovate (v)", "commercial (adj)", "residential (adj)", "spacious (adj)", "functional (adj)", "properly (adv)"]
topic26_pronounce = ["/propǝti/", "/li:s/", "/tenant/", "/ lændlord/", "/rent/", "/'mænid3/", "/Dkjupar/", "/'renǝvert/", "/kə mə rfəl/", "/rezi denfǝl/", "/'sperses/", "/fanksǝnl/", "/ propǝli/"]
topic26_meaning = ["bất động sản hoặc đất đai và các tòa nhà", "hợp đồng cho thuê tài sản", "một người thuê tài sản", "một người sở hữu tài sản cho thuê", "số tiền phải trả khi sử dụng tài sản", "để giám sát hoạt động của một tài sản", "sử dụng hoặc sống trong một tài sản", "để cải thiện hoặc cập nhật một tài sản", "liên quan đến kinh doanh hoặc thương mại", "liên quan đến không gian sống hoặc nhà cửa", "có không gian rộng rãi", "phục vụ mục đích thực tế", "theo cách đúng đắn và/hoặc phù hợp"]

for i in range(len(topic26_words)):
    cleaned_word = re.sub(r'\s*\((n|v|adj|adv)\)$', '', topic26_words[i]).strip()
    all_vocabulary_items.append({
        "word": cleaned_word,
        "pronounce": topic26_pronounce[i],
        "meaning": topic26_meaning[i]
    })

# --- Data for Topic 27. Board Meetings and Committees ---
topic27_words = ["agenda (n)", "minutes (n)", "committee (n)", "quorum (n)", "convene (v)", "vote (v)", "discuss (v)", "adjourn (v)", "formal (adj)", "unanimous (adj)", "productive (adj)", "executive (adj)"]
topic27_pronounce = ["/ ə'dzende/", "/mınıts/", "/kə mıti/", "/kwɔ:rəm/", "/kən vi:n/", "/vout/", "/di'sKAS/", "/ə'd33:rn/", "/fo:rmal/", "/ju'nænıməs/", "/prǝ'daktiv/", "/1g'zekjǝtıv/"]
topic27_meaning = ["danh sách các vấn đề sẽ được thảo luận tại cuộc họp", "một bản ghi chép về những gì đã được thảo luận", "một nhóm người được bổ nhiệm cho một chức năng cụ thể", "số lượng thành viên tối thiểu cần thiết để tổ chức một cuộc họp", "để tập hợp lại cho một cuộc họp", "để bày tỏ một sự lựa chọn hoặc ý kiến", "để nói về một chủ đề một cách chi tiết", "kết thúc một cuộc họp", "thực hiện theo các quy tắc hoặc nghi lễ", "hoàn toàn đồng ý", "đạt được một số lượng hoặc kết quả đáng kể", "liên quan đến việc quản lý một doanh nghiệp hoặc một tổ chức, và với việc lập kế hoạch và ra quyết định"]

for i in range(len(topic27_words)):
    cleaned_word = re.sub(r'\s*\((n|v|adj|adv)\)$', '', topic27_words[i]).strip()
    all_vocabulary_items.append({
        "word": cleaned_word,
        "pronounce": topic27_pronounce[i],
        "meaning": topic27_meaning[i]
    })

# --- Data for Topic 28. Quality Control ---
topic28_words = ["quality (n)", "standard (n)", "inspection (n)", "defect (n)", "inspect (v)", "test (v)", "comply (v)", "correct (v)", "consistent (adj)", "defective (adj)", "high-quality (adj)", "approved (adj)"]
topic28_pronounce = ["/'kwoliti/", "/ stændǝrd/", "/in'spek n/", "/'di:fekt/", "/in'spekt/", "/test/", "/kəm plaı/", "/kə'rekt/", "/kən'sıstənt/", "/dı'fektiv/", "/hai 'kwplıti/", "/ə'pru:vd/"]
topic28_meaning = ["tiêu chuẩn của một cái gì đó được đo so với những thứ khác", "một mức độ chất lượng hoặc đạt được", "kiểm tra hoặc xem xét cẩn thận", "một thiếu sót, sự không hoàn hảo, hoặc thiểu", "quan sát kỹ để kiểm tra chất lượng", "thực hiện các biện pháp để kiểm tra chất lượng, hiệu suất hoặc độ tin cậy", "hành động theo quy tắc", "để loại bỏ lỗi hoặc khiếm khuyết", "hành động hoặc thực hiện theo cùng một cách theo thời gian", "không hoàn hảo hoặc bị lỗi", "đạt tiêu chuẩn rất tốt", "được chấp thuận"]

for i in range(len(topic28_words)):
    cleaned_word = re.sub(r'\s*\((n|v|adj|adv)\)$', '', topic28_words[i]).strip()
    all_vocabulary_items.append({
        "word": cleaned_word,
        "pronounce": topic28_pronounce[i],
        "meaning": topic28_meaning[i]
    })

# --- Data for Topic 29. Product Development ---
topic29_words = ["prototype (n)", "feature (n)", "innovation (n)", "specification (n)", "develop (v)", "design (v)", "enhance (v)", "launch (v)", "innovative (adj)", "marketable (adj)", "competitive (adj)", "enhanced (adj)"]
topic29_pronounce = ["/'proute taip/", "/fi:tfər/", "/ ınǝ versn/", "/ spesifi kerſn/", "/dı'velǝp/", "/dı'zaın/", "/in hæns/", "/lo:ntf/", "/'ınə veıtıv/", "/ma:rkıtəbl/", "/kəm petǝtıv/", "/ın ha:nst/"]
topic29_meaning = ["mô hình đầu tiên của một cái gì đó mà từ đó những cái khác được phát triển", "một thuộc tính hoặc khía cạnh đặc biệt", "một phương pháp, ý tưởng hoặc sản phẩm mới", "mô tả chi tiết về thiết kế và vật liệu", "để phát triển hoặc gây ra để phát triển", "để tạo ra kế hoạch hoặc bản vẽ", "để cải thiện chất lượng hoặc giá trị", "để giới thiệu một sản phẩm hoặc dịch vụ mới", "giới thiệu các phương pháp hoặc ý tưởng mới", "có thể được bán", "có khả năng cạnh tranh với người khác", "tăng lên, cải thiện"]

for i in range(len(topic29_words)):
    cleaned_word = re.sub(r'\s*\((n|v|adj|adv)\)$', '', topic29_words[i]).strip()
    all_vocabulary_items.append({
        "word": cleaned_word,
        "pronounce": topic29_pronounce[i],
        "meaning": topic29_meaning[i]
    })

# --- Data for Topic 30. Renting and Leasing ---
topic30_words = ["lease (n)", "tenant (n)", "landlord (n)", "property (n)", "lease (v)", "rent (v)", "occupy (v)", "terminate (v)", "residential (adj)", "commercial (adj)", "vacant (adj)", "rent-free (adv)"]
topic30_pronounce = ["/li:s/", "/tenant/", "/ lænd lord/", "/'propərti/", "/li:s/", "/rent/", "/'Dkju, par/", "/t3:rminext/", "/rezi'denfǝl/", "/kə m3:rfl/", "/verkənt/", "/ rent 'fri:/"]
topic30_meaning = ["hợp đồng cho thuê tài sản", "một người thuê tài sản từ chủ nhà", "chủ sở hữu tài sản cho người thuê nhà thuê", "một cái gì đó thuộc sở hữu, thường là đất đai hoặc các tòa nhà", "cho thuê tài sản", "trả tiền để sử dụng tài sản", "cư trú hoặc chiếm không gian", "để chấm dứt hợp đồng thuê hoặc hợp đồng", "liên quan đến một khu vực nơi mọi người sinh sống", "liên quan đến hoạt động kinh doanh", "không bị chiếm đóng hoặc đang được sử dụng", "miễn tiền thuê nhà"]

for i in range(len(topic30_words)):
    cleaned_word = re.sub(r'\s*\((n|v|adj|adv)\)$', '', topic30_words[i]).strip()
    all_vocabulary_items.append({
        "word": cleaned_word,
        "pronounce": topic30_pronounce[i],
        "meaning": topic30_meaning[i]
    })

# --- Data for Topic 31. Selecting a Restaurant ---
topic31_words = ["reservation (n)", "cuisine (n)", "ambiance (n)", "service (n)", "recommend (v)", "dine (v)", "book (v)", "order (v)", "request (v)", "delicious (adj)", "high-class (adj)", "locally (adv)"]
topic31_pronounce = ["/ rezer versn/", "/kwi'zi:n/", "/'æmbians/", "/'S3: IVIS/", "/ reka mend/", "/dain/", "/buk/", "/order/", "/'kwest/", "/dı lıfǝs/", "/ fərdəbl/", "/ ləkəli/"] # Pronunciation for high-class seems to be a typo in the source (/ fərdəbl/ is affordable)
topic31_meaning = ["một sự sắp xếp để đảm bảo một cái bàn", "một phong cách nấu ăn", "bầu không khí của một nơi", "sự hỗ trợ và tư vấn được cung cấp bởi một doanh nghiệp", "gợi ý là tốt", "ăn tối", "đặt chỗ trước", "yêu cầu một cái gì đó được thực hiện hoặc giao", "yêu cầu", "rất ngon", "chất lượng tốt", "địa phương"]

for i in range(len(topic31_words)):
    cleaned_word = re.sub(r'\s*\((n|v|adj|adv)\)$', '', topic31_words[i]).strip()
    all_vocabulary_items.append({
        "word": cleaned_word,
        "pronounce": topic31_pronounce[i],
        "meaning": topic31_meaning[i]
    })

# --- Data for Topic 32. Eating Out ---
topic32_words = ["appetizer (n)", "entrée (n)", "menu (n)", "check (n)", "complain (v)", "serve (v)", "tip (v)", "reserve (v)", "savory (adj)", "crowded (adj)", "courteous (adj)", "efficiently (adv)"]
topic32_pronounce = ["/'æpı, taızər/", "/'a:ntrex/", "/'menju:/", "/tfek/", "/kəm plein/", "/s3:rv/", "/tip/", "/ΓΙ'Ζ3:ΓV/", "/'serveri/", "/'kraudıd/", "/k3:rties/", "/1'fıfəntli/"]
topic32_meaning = ["một món ăn nhỏ phục vụ trước món chính", "món chính của bữa ăn", "danh sách các lựa chọn thực phẩm và đồ uống", "hóa đơn ở nhà hàng", "phàn nàn", "mang thức ăn hoặc đồ uống đến bàn", "để cung cấp thêm tiền cho dịch vụ", "sắp xếp để có sẵn một cái bàn", "có vị mặn hoặc cay", "đầy người", "lịch sự và tôn trọng", "theo cách đạt được năng suất tối đa với nỗ lực lãng phí tối thiểu"]

for i in range(len(topic32_words)):
    cleaned_word = re.sub(r'\s*\((n|v|adj|adv)\)$', '', topic32_words[i]).strip()
    all_vocabulary_items.append({
        "word": cleaned_word,
        "pronounce": topic32_pronounce[i],
        "meaning": topic32_meaning[i]
    })

# --- Data for Topic 33. Ordering Lunch ---
topic33_words = ["delivery (n)", "beverage (n)", "portion (n)", "tray (n)", "pack (v)", "prepare (v)", "pick up (v)", "queue (v)", "separate (adj)", "convenient (adj)", "quick (adj)", "freshly (adv)"]
topic33_pronounce = ["/dı lıvəri/", "/'bevǝrıdz/", "/po:rfn/", "/trex/", "/pæk/", "/pri per/", "/рік /", "/kju:/", "/'seprǝt/", "/kən vi:niənt/", "/kwIk/", "/'freli/"]
topic33_meaning = ["hành động đưa hàng hóa đến một địa điểm", "đồ uống", "lượng thức ăn phục vụ cho một người", "một thùng phẳng, nông để đựng thức ăn và đồ uống", "để thực phẩm trong một thùng chứa để vận chuyển", "chuẩn bị sẵn thức ăn để ăn", "lấy mang về", "xếp hàng", "riêng lẻ", "dễ dàng tiếp cận, truy cập hoặc sử dụng", "xảy ra hoặc thực hiện với tốc độ", "được thực hiện hoặc sản xuất gần đây"]

for i in range(len(topic33_words)):
    cleaned_word = re.sub(r'\s*\((n|v|adj|adv)\)$', '', topic33_words[i]).strip()
    all_vocabulary_items.append({
        "word": cleaned_word,
        "pronounce": topic33_pronounce[i],
        "meaning": topic33_meaning[i]
    })

# --- Data for Topic 34. Cooking as a Career ---
topic34_words = ["chef (n)", "recipe (n)", "cuisine (n)", "kitchen (n)", "prepare (v)", "cook (v)", "bake (v)", "specialize (v)", "creative (adj)", "skilled (adj)", "passionate (adj)", "professionally (adv)"]
topic34_pronounce = ["/ζεf/", "/'resıpi/", "/kwi'zi:n/", "/'kıtsın/", "/pri per/", "/kuk/", "/berk/", "/'speşə laız/", "/kri'ertIv/", "/skıld/", "/'pæfənıt/", "/prə fefənəli/"]
topic34_meaning = ["một đầu bếp chuyên nghiệp", "một bộ hướng dẫn nấu ăn", "một phong cách nấu ăn", "một căn phòng nơi thức ăn được chuẩn bị", "chuẩn bị sẵn sàng để nấu ăn", "chuẩn bị thức ăn bằng cách hâm nóng nó", "nấu thức ăn bằng nhiệt khô trong lò", "để tập trung vào một lĩnh vực cụ thể của nấu ăn", "có khả năng tạo ra những ý tưởng hoặc những điều mới", "có khả năng làm tốt điều gì đó", "có cảm xúc hoặc niềm tin mạnh mẽ", "theo cách liên quan đến một nghề nghiệp"]

for i in range(len(topic34_words)):
    cleaned_word = re.sub(r'\s*\((n|v|adj|adv)\)$', '', topic34_words[i]).strip()
    all_vocabulary_items.append({
        "word": cleaned_word,
        "pronounce": topic34_pronounce[i],
        "meaning": topic34_meaning[i]
    })

# --- Data for Topic 35. Events ---
topic35_words = ["event (n)", "venue (n)", "organizer (n)", "attendee (n)", "organize (v)", "schedule (v)", "host (v)", "attend (v)", "successful (adj)", "organized (adj)", "memorable (adj)", "smoothly (adv)"]
topic35_pronounce = ["/1 vent/", "/'venju:/", "/  :rgə naızər/", "/ tendi:/", "/   :rgə naız/", "/ skedzu:l/", "/houst/", "/ tend/", "/sək sesfl/", "/'organaızd/", "/ memərəbl/", "/'smu:õli/"]
topic35_meaning = ["một dịp công cộng hoặc xã hội theo kế hoạch", "nơi diễn ra sự kiện", "người lập kế hoạch và điều phối các sự kiện", "người có mặt tại một sự kiện", "sắp xếp hoặc lên kế hoạch cho một sự kiện", "sắp xếp hoặc lập kế hoạch thời gian cho một sự kiện", "để cung cấp địa điểm cho một sự kiện", "có mặt tại một sự kiện", "đã đạt được một mục tiêu hoặc mục tiêu", "được sắp xếp một cách có hệ thống", "đáng ghi nhớ", "không có vấn đề hoặc khó khăn"]

for i in range(len(topic35_words)):
    cleaned_word = re.sub(r'\s*\((n|v|adj|adv)\)$', '', topic35_words[i]).strip()
    all_vocabulary_items.append({
        "word": cleaned_word,
        "pronounce": topic35_pronounce[i],
        "meaning": topic35_meaning[i]
    })

# --- Data for Topic 36. General Travel ---
topic36_words = ["itinerary (n)", "passport (n)", "reservation (n)", "fare (n)", "depart (v)", "arrive (v)", "book (v)", "check-in (v)", "convenient (adj)", "scenic (adj)", "comfortable (adj)", "experienced (adj)"]
topic36_pronounce = ["/aı tınə, reri/", "/'pæsport/", "/rezer versn/", "/feǝr/", "/di'pa:rt/", "/ raiv/", "/buk/", "/'tſek in/", "/kən vi:niənt/", "/'si:nık/", "/ kamfərtəbl/", "/ık'spıəriənst/"]
topic36_meaning = ["một tuyến đường hoặc lịch trình du lịch theo kế hoạch", "một tài liệu chính thức cho du lịch quốc tế", "đặt chỗ cho chuyến đi hoặc chỗ ở", "giá vé du lịch", "rời đi, thường là trên một cuộc hành trình", "để đến đích", "để đặt chỗ hoặc cuộc hẹn", "đăng ký khi đến sân bay hoặc khách sạn", "dễ sử dụng hoặc truy cập", "cung cấp cảnh quan đẹp", "mang lại sự thoải mái và thư giãn về thể chất", "trải nghiệm"]

for i in range(len(topic36_words)):
    cleaned_word = re.sub(r'\s*\((n|v|adj|adv)\)$', '', topic36_words[i]).strip()
    all_vocabulary_items.append({
        "word": cleaned_word,
        "pronounce": topic36_pronounce[i],
        "meaning": topic36_meaning[i]
    })

# --- Data for Topic 37. Airlines ---
topic37_words = ["flight (n)", "boarding pass (n)", "gate (n)", "cabin (n)", "baggage (n)", "depart (v)", "land (v)", "check-in (v)", "board (v)", "take off (v)", "domestic (adj)", "complimentary", "on-time (adj)"]
topic37_pronounce = ["/flart/", "/'bo:rdın pæs/", "/gert/", "/'kæbin/", "/'bægid3/", "/di'pa:rt/", "/lænd/", "/'tſek in/", "/bo:rd/", "/ terk of/", "/də'mestik/", "/komplı mentri/", "/'pn taım/"]
topic37_meaning = ["một cuộc hành trình được thực hiện bằng đường hàng không", "một tài liệu cho phép một hành khách lên máy bay", "khu vực nơi hành khách lên máy bay", "nội thất của máy bay", "hành lý du lịch", "rời đi, thường là từ sân bay", "đến mặt đất từ trên không", "đăng ký tại sân bay trước khi lên máy bay", "lên máy bay", "cất cánh", "nội địa", "miên phí", "đến hoặc đi đúng giờ đã định"]

for i in range(len(topic37_words)):
    cleaned_word = re.sub(r'\s*\((n|v|adj|adv)\)$', '', topic37_words[i]).strip()
    all_vocabulary_items.append({
        "word": cleaned_word,
        "pronounce": topic37_pronounce[i],
        "meaning": topic37_meaning[i]
    })

# --- Data for Topic 38. Trains ---
topic38_words = ["vehicle (n)", "route (n)", "fare (n)", "passenger (n)", "safety (n)", "railway (n)", "station (n)", "transport (v)", "transfer (v)", "commute (v)", "high-speed", "costly (adj)"]
topic38_pronounce = ["/ vi:ǝkl/", "/ru:t/", "/feǝr/", "/'pæsındzə(r)/", "/'serfti/", "/'reilwer/", "/'stersn/", "/ trænsport/", "/ trænsf3:r/", "/kə'mju:t/", "/hai 'spi.d/", "/'kpstli/"]
topic38_meaning = ["một phương tiện giao thông", "một con đường hoặc khóa học được thực hiện để đạt đến đích", "giá vé đi du lịch", "hành khách", "sự an toàn", "đướng sắt", "nhà ga", "mang theo hoặc di chuyển từ nơi này đến nơi khác", "di chuyển từ nơi này đến nơi khác", "đi du lịch thường xuyên đến và đi làm", "tốc độ cao", "nhiều tiền"]

for i in range(len(topic38_words)):
    cleaned_word = re.sub(r'\s*\((n|v|adj|adv)\)$', '', topic38_words[i]).strip()
    all_vocabulary_items.append({
        "word": cleaned_word,
        "pronounce": topic38_pronounce[i],
        "meaning": topic38_meaning[i]
    })

# --- Data for Topic 39. Hotels ---
topic39_words = ["reservation (n)", "confirmation (n)", "suite (n)", "amenities (n)", "rate (n)", "accommodation (n)", "upgrade (v)", "modify (v)", "inquire (v)", "check-in (v)", "check-out (v)", "deluxe (adj)", "beforehand (adv)"]
topic39_pronounce = ["/ rezǝr versn/", "/ konfər mezfn/", "/swi:t/", "/ə'mi:nıtiz/", "/rest/", "/ ə kömə deıfn/", "/Ap'greid/", "/'mpdıfaI/", "/ın kwaıər/", "/ tſek in/", "/'tjek aut/", "/dı'laks/", "/bi'fo.hænd/"]
topic39_meaning = [
    "đặt phòng hoặc dịch vụ",
    "xác minh rằng việc đặt chỗ đã được đảm bảo",
    "một tập hợp các phòng để ở",
    "các tính năng hoặc dịch vụ được cung cấp để mang lại sự thoải mái",
    "giá chỗ ở",
    "một nơi để ở",
    "để cải thiện phòng hoặc dịch vụ tốt hơn",
    "để thay đổi hoặc điều chỉnh việc đặt chỗ",
    "để hỏi về tình trạng sẵn có hoặc mức giá",
    "đăng ký khi đến nơi",
    "rời đi và thanh toán hóa đơn",
    "chất lượng cao và sang trọng",
    "trước đó"
]
for i in range(len(topic39_words)):
    cleaned_word = re.sub(r'\s*\((n|v|adj|adv)\)$', '', topic39_words[i]).strip()
    all_vocabulary_items.append({
        "word": cleaned_word,
        "pronounce": topic39_pronounce[i],
        "meaning": topic39_meaning[i]
    })

# --- Data for Topic 40. Car Rentals ---
topic40_words = ["rental (n)", "damage (n)", "insurance (n)", "deposit (n)", "rent (v)", "return (v)", "pick up (v)", "drop off (v)", "compact (adj)", "additional (adj)", "standard (adj)", "luxury (adj)"]
topic40_pronounce = ["/rental/", "/'dæmid3/", "/ın fuərəns/", "/di'pDzIt/", "/rent/", "/rı't3:rn/", "/pik /", "/drap pf/", "/ kampækt/", "/ dışənl/", "/'stændǝd/", "/ Inkfəri/"]
topic40_meaning = ["một thỏa thuận để thuê một chiếc xe hơi", "thiệt hại", "bảo hiểm cho những thiệt hại hoặc tai nạn", "một khoản thanh toán trả trước để đảm bảo tiền thuê", "trả tiền cho việc sử dụng một chiếc xe hơi", "mang chiếc xe đã thuê về", "để lấy xe thuê từ một địa điểm cụ thể", "để trả xe thuê tại một địa điểm cụ thể", "nhỏ và tiện lợi khi lái xe trong thành phố", "thêm", "tiêu chuẩn", "xa xỉ, đắt tiền"]

for i in range(len(topic40_words)):
    cleaned_word = re.sub(r'\s*\((n|v|adj|adv)\)$', '', topic40_words[i]).strip()
    all_vocabulary_items.append({
        "word": cleaned_word,
        "pronounce": topic40_pronounce[i],
        "meaning": topic40_meaning[i]
    })

# --- Data for Topic 41. Movies ---
topic41_words = ["screening (n)", "genre (n)", "ticket (n)", "plot (n)", "watch (v)", "direct (v)", "star (v)", "premiere (v)", "entertaining (adj)", "captivating (adj)", "thrilling (adj)", "enjoyably (adv)"]
topic41_pronounce = ["/'skri:nın/", "/3pnrǝ/", "/'tıkıt/", "/plot/", "/wpts/", "/dı'rekt/", "/sta:r/", "/prı mıǝr/", "/ inte teının/", "/'kæptivertin/", "/'θrɪlɪŋ/", "/ın'dzorǝbli/"]
topic41_meaning = ["buổi chiếu một bộ phim", "một thể loại phim", "một tấm vé cho phép vào xem phim", "cốt truyện của một bộ phim", "để xem một bộ phim", "để giám sát việc sản xuất một bộ phim", "để đảm nhận vai chính trong một bộ phim", "để hiển thị lần đầu tiên", "cung cấp sự thích thú hoặc giải trí", "thu hút và nắm giữ sự quan tâm", "gây ra sự phấn khích hoặc niềm vui", "theo cách mang lại sự thích thú"]

for i in range(len(topic41_words)):
    cleaned_word = re.sub(r'\s*\((n|v|adj|adv)\)$', '', topic41_words[i]).strip()
    all_vocabulary_items.append({
        "word": cleaned_word,
        "pronounce": topic41_pronounce[i],
        "meaning": topic41_meaning[i]
    })

# --- Data for Topic 42. Theater ---
topic42_words = ["performance (n)", "stage (n)", "script (n)", "audience (n)", "act (v)", "rehearse (v)", "direct (v)", "perform (v)", "dramatic (adj)", "engaging (adj)", "skilled (adj)", "passionately (adv)"]
topic42_pronounce = ["/pər'fo:rməns/", "/steidz/", "/skript/", "/ :diəns/", "/ækt/", "/rı h3:rs/", "/dı'rekt/", "/pər form/", "/drǝ mætık/", "/in geidzin/", "/skıld/", "/'pæfənətli/"]
topic42_meaning = ["một chương trình trực tiếp hoặc vở kich", "khu vực diễn viên biểu diễn", "văn bản của một vở kịch", "mọi người đang xem buổi biểu diễn", "biểu diễn trong một vở kịch", "để luyện tập biểu diễn", "để giám sát việc sản xuất một vở kịch", "để trình bày một vở kịch hoặc chương trình", "liên quan đến kịch hoặc sân khấu", "thú vị và hấp dẫn", "có chuyên môn hoặc khả năng", "với cảm xúc mạnh mẽ hoặc sự nhiệt tình"]

for i in range(len(topic42_words)):
    cleaned_word = re.sub(r'\s*\((n|v|adj|adv)\)$', '', topic42_words[i]).strip()
    all_vocabulary_items.append({
        "word": cleaned_word,
        "pronounce": topic42_pronounce[i],
        "meaning": topic42_meaning[i]
    })

# --- Data for Topic 43. Music ---
topic43_words = ["concert (n)", "melody (n)", "rhythm (n)", "genre (n)", "perform (v)", "compose (v)", "play (v)", "rehearse (v)", "harmonious (adj)", "lively (adj)", "melodic (adj)", "musically (adv)"]
topic43_pronounce = ["/'konsert/", "/'melədi/", "/rığəm/", "/3pnrǝ/", "/pər form/", "/kəm pouz/", "/plex/", "/r1'h3:rs/", "/ha:r morniəs/", "/latvli/", "/mə'Indık/", "/ mjuzikli/"]
topic43_meaning = ["một buổi biểu diễn âm nhạc trực tiếp", "một chuỗi các nốt nhạc", "kiểu nhịp trong âm nhạc", "một thể loại âm nhạc", "chơi hoặc hát nhạc", "để tạo ra âm nhạc", "tạo ra âm nhạc bằng một nhạc cụ", "luyện tập âm nhạc", "làm vui tai", "tràn đầy năng lượng hoặc hứng thú", "có một âm thanh dễ chịu", "theo cách liên quan đến âm nhạc"]

for i in range(len(topic43_words)):
    cleaned_word = re.sub(r'\s*\((n|v|adj|adv)\)$', '', topic43_words[i]).strip()
    all_vocabulary_items.append({
        "word": cleaned_word,
        "pronounce": topic43_pronounce[i],
        "meaning": topic43_meaning[i]
    })

# --- Data for Topic 44. Museums ---
topic44_words = ["exhibit (n)", "collection (n)", "artifact (n)", "curator (n)", "display (v)", "organize (v)", "guide (v)", "present (v)", "educational (adj)", "interactive (adj)", "historic (adj)", "culturally (adv)"]
topic44_pronounce = ["/1g Zıbıt/", "/kə'lekſən/", "/'a:rtrfækt/", "/kju'reıtə(r)/", "/di'spler/", "/' :rgənaız/", "/gard/", "/pri zent/", "/ɛdzu kerſenl/", "/ Inter æktıv/", "/historik/", "/kaltfərəli/"]
topic44_meaning = ["trưng bày nghệ thuật hoặc hiện vật", "một nhóm đối tượng quan tâm", "một đối tượng quan tâm lịch sử", "một người quản lý một bảo tàng", "để hiển thị các mục để xem", "sắp xếp hoặc thiết lập", "để dẫn dắt hoặc hướng dẫn du khách", "để hiển thị hoặc triển lãm", "cung cấp kiến thức hoặc học tập", "liên quan đến sự tham gia tích cực", "liên quan đến lịch sử", "theo cách liên quan đến văn hóa"]

for i in range(len(topic44_words)):
    cleaned_word = re.sub(r'\s*\((n|v|adj|adv)\)$', '', topic44_words[i]).strip()
    all_vocabulary_items.append({
        "word": cleaned_word,
        "pronounce": topic44_pronounce[i],
        "meaning": topic44_meaning[i]
    })

# --- Data for Topic 45. Media ---
topic45_words = ["journalism (n)", "broadcast (n)", "press (n)", "publication (n)", "report (v)", "interview (v)", "edit (v)", "cover (v)", "overload (v)", "in-depth (adj)", "informative (adj)", "unbiased (adj)"]
topic45_pronounce = ["/d33:rnəlızəm/", "/'bro:dkæst/", "/pres/", "/pablı kerſn/", "/rı'po.rt/", "/'intervju:/", "/'edit/", "/'kʌver/", "/ˌoʊvərˈloʊd/", "/ in 'depe/", "/ın formatıv/", "/ʌn'barest/"]
topic45_meaning = ["hoạt động đưa tin", "truyền tải thông tin hoặc giải trí", "báo chí và các phương tiện truyền thông khác", "một tài liệu in hoặc trực tuyến", "để cung cấp thông tin", "hỏi ai đó để biết thông tin", "chuẩn bị tài liệu để xuất bản", "để báo cáo về một câu chuyện tin tức", "quả tải", "sâu sắc", "cung cấp thông tin hữu ích hoặc thú vị", "vô tư và không bị ảnh hưởng bởi cảm xúc cá nhân"]

for i in range(len(topic45_words)):
    cleaned_word = re.sub(r'\s*\((n|v|adj|adv)\)$', '', topic45_words[i]).strip()
    all_vocabulary_items.append({
        "word": cleaned_word,
        "pronounce": topic45_pronounce[i],
        "meaning": topic45_meaning[i]
    })

# --- Data for Topic 46. Doctor's Office ---
topic46_words = ["appointment (n)", "examination (n)", "prescription (n)", "diagnosis (n)", "consult (v)", "treat (v)", "examine (v)", "prescribe (v)", "professional (adj)", "thorough (adj)", "attentive (adj)", "infected (adj)"]
topic46_pronounce = ["/ ə'pointment/", "/1g zæmı nerfn/", "/pri'skrıpfn/", "/darǝg nousıS/", "/kən salt/", "/tri:t/", "/1g zæmın/", "/pri skraib/", "/prǝ fefənl/", "/03:Γου/", "/ǝ'tentiv/", "/ın fektid/"]
topic46_meaning = ["một cuộc hẹn đã được lên lịch với bác sĩ", "kiểm tra y tế", "giấy yêu cầu dùng thuốc của bác sĩ", "xác định một căn bệnh", "để tìm kiếm lời khuyên hoặc điều trị", "để cung cấp dịch vụ chăm sóc y tế", "để kiểm tra hoặc điều tra", "giới thiệu thuốc", "liên quan đến một nghề nghiệp hoặc chuyên môn", "chi tiết và đầy đủ", "chú ý kỹ", "bị lây nhiễm"]

for i in range(len(topic46_words)):
    cleaned_word = re.sub(r'\s*\((n|v|adj|adv)\)$', '', topic46_words[i]).strip()
    all_vocabulary_items.append({
        "word": cleaned_word,
        "pronounce": topic46_pronounce[i],
        "meaning": topic46_meaning[i]
    })

# --- Data for Topic 47. Dentist's Office ---
topic47_words = ["appointment (n)", "cavity (n)", "cleaning (n)", "extraction (n)", "examine (v)", "fill (v)", "extract (v)", "clean (v)", "implant (v)", "implant", "implant", "implant"]
topic47_pronounce = ["/ə'pointment/", "/'kæviti/", "/'kli:nın/", "/ık'strækfən/", "/1g'zæmın/", "/fil/", "/'ekstrækt/", "/kli:n/", "/Im'pla:nt/", "implant", "implant", "implant"]
topic47_meaning = ["một chuyến thăm theo lịch trình với một nha sĩ", "một khu vực bị hư hỏng trong răng", "loại bỏ mảng bám và cao răng", "loại bỏ một chiếc răng", "để kiểm tra tình trạng răng", "phục hồi răng bằng vật liệu", "lấy ra, nhổ ra", "để loại bỏ bụi bẩn hoặc mảnh vụn", "cấy ghép", "implant", "implant", "implant"]

for i in range(len(topic47_words)):
    cleaned_word = re.sub(r'\s*\((n|v|adj|adv)\)$', '', topic47_words[i]).strip()
    all_vocabulary_items.append({
        "word": cleaned_word,
        "pronounce": topic47_pronounce[i],
        "meaning": topic47_meaning[i]
    })

# --- Data for Topic 48. Health Insurance ---
topic48_words = ["policy (n)", "coverage (n)", "premium (n)", "claim (n)", "deductible (n)", "insure (v)", "reimburse (v)", "cover (v)", "enroll (v)", "comprehensive (adj)", "qualified (adj)", "allowable (adj)"]
topic48_pronounce = ["/'polisi/", "/'kaveridz/", "/'pri:miǝm/", "/kleim/", "/dı'daktəbl/", "/ın fuǝr/", "/ri:zm'b3:rs/", "/kavǝr/", "/in roul/", "/ komprı hansıv/", "/'kwplıfard/", "/ə'lavəbl/"]
topic48_meaning = ["hợp đồng bảo hiểm bằng văn bản", "sự bảo vệ được cung cấp bởi bảo hiểm", "số tiền đã trả cho bảo hiểm", "yêu cầu thanh toán từ hiểm", "phần yêu cầu bồi thường bảo hiểm mà một người phải trả trong khi công ty bảo hiểm trả phần còn lại", "để cung cấp sự bảo vệ tài chính", "để trả lại số tiền đã bỏ ra", "đưa vào bảo hiểm", "để đăng ký bảo hiểm", "đáp ứng nhiều nhu cầu", "đủ điều kiện", "được cho phép bởi luật, quy định,"]

for i in range(len(topic48_words)):
    cleaned_word = re.sub(r'\s*\((n|v|adj|adv)\)$', '', topic48_words[i]).strip()
    all_vocabulary_items.append({
        "word": cleaned_word,
        "pronounce": topic48_pronounce[i],
        "meaning": topic48_meaning[i]
    })

# --- Data for Topic 49. Hospitals ---
topic49_words = ["emergency (n)", "ward (n)", "admission (n)", "treatment (n)", "admit (v)", "discharge (v)", "diagnose (v)", "immunize (v)", "allergic (adj)", "abnormal (adj)", "clinical (adj)", "specialized (adj)"]
topic49_pronounce = ["/1 m3:rdzənsi/", "/word/", "/ǝd'mıfən/", "/tri:tmənt/", "/ǝd mit/", "/dıs'tfa rd3/", "/ dareg nouz/", "/'Imjunaız/", "/ə'l3:dzık/", "/æb no:ml/", "/ klınıkl/", "/ speşəlaızd/"]
topic49_meaning = ["một tình huống nghiêm trọng cần được chăm sóc ngay lập tức", "một bộ phận của bệnh viện dành cho bệnh nhân", "quá trình được chấp nhận vào bệnh viện", "chăm sóc y tế được cung cấp cho bệnh nhân", "tiếp nhận một bệnh nhân vào bệnh viện", "đưa một bệnh nhân ra khỏi bệnh viện", "để xác định tình trạng bệnh lý", "để bảo vệ một người hoặc một con vật khỏi bệnh tật, đặc biệt là bằng cách tiêm vắc-xin cho họ", "dị ứng", "bất thường", "liên quan đến chăm sóc và điều trị bệnh nhân", "tập trung vào một lĩnh vực y học cụ thể"]

for i in range(len(topic49_words)):
    cleaned_word = re.sub(r'\s*\((n|v|adj|adv)\)$', '', topic49_words[i]).strip()
    all_vocabulary_items.append({
        "word": cleaned_word,
        "pronounce": topic49_pronounce[i],
        "meaning": topic49_meaning[i]
    })

# --- Data for Topic 50. Pharmacy ---
topic50_words = ["prescription (n)", "medication (n)", "pharmacist (n)", "dosage (n)", "dispense (v)", "administer (v)", "refill (v)", "discontinue (v)", "accurate (adj)", "over-the-counter (adj)", "essential (adj)", "safely (adv)"]
topic50_pronounce = ["/pri skripsn/", "/ medi kerſen/", "/'fa:rməsıst/", "/'dousId3/", "/dis'pens/", "/ǝd'mınıstər/", "/rı'fil/", "/ dıskən'tınju:/", "/'ækjurət/", "/ouvərdə kaunter/", "/1'senfǝl/", "/'serfli/"]
topic50_meaning = ["văn bản yêu cầu dùng thuốc", "thuốc dùng để điều trị bệnh", "một chuyên gia phân phát thuốc", "số lượng thuốc cần dùng", "đưa thuốc", "đưa thuốc cho bệnh nhân", "để bổ sung một đơn thuốc", "ngừng lại nếu có gì bất thường", "chính xác và đúng đắn", "có sẵn mà không cần toa", "cần thiết và quan trọng", "theo cách tránh gây hại"]

for i in range(len(topic50_words)):
    cleaned_word = re.sub(r'\s*\((n|v|adj|adv)\)$', '', topic50_words[i]).strip()
    all_vocabulary_items.append({
        "word": cleaned_word,
        "pronounce": topic50_pronounce[i],
        "meaning": topic50_meaning[i]
    })


# --- Save to JSON file ---
json_file_path = 'toeic_600_vocabulary.json'
with open(json_file_path, 'w', encoding='utf-8') as f:
    json.dump(all_vocabulary_items, f, ensure_ascii=False, indent=4)

print(f"Successfully created {json_file_path} with {len(all_vocabulary_items)} vocabulary items.")