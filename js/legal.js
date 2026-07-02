(function () {
  'use strict';

  var LANG_STORAGE_KEY = 'zeferan-lang';
  var URL_TO_LANG = { en: 'en', eng: 'en', az: 'tr', ru: 'ru', tr: 'tk' };
  var LANG_TO_URL = { en: 'en', tr: 'az', ru: 'ru', tk: 'tr' };
  var HTML_LANG = { en: 'en', tr: 'az', tk: 'tr' };
  var LANG_LABELS = { en: 'EN', tr: 'AZ', ru: 'RU', tk: 'TR' };

  var COMMON = {
    skip: {
      en: 'Skip to content',
      tr: 'Mündəricata keç',
      ru: 'Перейти к содержимому',
      tk: 'İçeriğe atla'
    },
    home: {
      en: 'Home',
      tr: 'Ana səhifə',
      ru: 'Главная',
      tk: 'Anasayfa'
    },
    menu: {
      en: 'Menu',
      tr: 'Menyu',
      ru: 'Меню',
      tk: 'Menü'
    },
    privacy: {
      en: 'Privacy Policy',
      tr: 'Məxfilik Siyasəti',
      ru: 'Политика конфиденциальности',
      tk: 'Gizlilik Politikası'
    },
    kvkk: {
      en: 'KVKK Notice',
      tr: 'KVKK Bildirişi',
      ru: 'Уведомление KVKK',
      tk: 'KVKK Aydınlatma'
    },
    cookies: {
      en: 'Manage cookies',
      tr: 'Cookie tənzimləri',
      ru: 'Управление cookie',
      tk: 'Çerez tercihleri'
    },
    rights: {
      en: '&copy; 2026 Zeferan Sultanahmet. All rights reserved.',
      tr: '&copy; 2026 Zəfəran Sultanahmet. Bütün hüquqlar qorunur.',
      ru: '&copy; 2026 Zeferan Sultanahmet. Все права защищены.',
      tk: '&copy; 2026 Zeferan Sultanahmet. Tüm hakları saklıdır.'
    },
    switchLanguage: {
      en: 'Switch language',
      tr: 'Dili dəyiş',
      ru: 'Сменить язык',
      tk: 'Dili değiştir'
    },
    toggleTheme: {
      en: 'Toggle theme',
      tr: 'Temanı dəyiş',
      ru: 'Сменить тему',
      tk: 'Temayı değiştir'
    },
    call: {
      en: 'Call Zeferan',
      tr: 'Zəfərana zəng et',
      ru: 'Позвонить в Zeferan',
      tk: 'Zeferan\'ı ara'
    },
    back: {
      en: 'Return to Zeferan',
      tr: 'Zəfərana qayıt',
      ru: 'Вернуться в Zeferan',
      tk: 'Zeferan\'a dön'
    }
  };

  var CONTENT = {
    privacy: {
      en: {
        title: 'Privacy Policy',
        meta: 'Last updated: 2026-05-04',
        description: 'How Zeferan Sultanahmet collects, processes, and protects your personal data. Privacy policy aligned with Turkey\'s KVKK and EU GDPR.',
        sections: [
          { h: '1. Data Controller', p: ['Zeferan Sultanahmet, Emin Sinan, Piyer Loti Cd. No:30, 34126 Fatih/Istanbul, Türkiye. Contact: <a href="mailto:info.sultanahmet@zeferan.com.tr">info.sultanahmet@zeferan.com.tr</a> · <a href="tel:+902126382212">+90 212 638 22 12</a>.'] },
          { h: '2. Data We Collect', ul: ['<strong>Reservation data:</strong> name, phone number, email, party size, date, preferred time, vehicle plate if provided, occasion, and dietary notes.', '<strong>Technical data:</strong> IP address, browser, device, referrer URL, and timestamps through standard server logs.', '<strong>Cookies and similar technologies:</strong> analytics or advertising cookies are used only after consent.'] },
          { h: '3. Why We Process Your Data', ul: ['To create, confirm, and manage reservations.', 'To contact you about reservation details.', 'To improve service quality and website experience, only with consent.', 'To comply with legal record-keeping obligations.'] },
          { h: '4. Legal Bases', ul: ['Performance of the reservation contract.', 'Your explicit consent for analytics, marketing, and advertising cookies.', 'Legitimate interests in operating the website securely.', 'Legal obligations where applicable.'] },
          { h: '5. Retention', p: ['Reservation contact details are removed from our active system within 6 hours after check-in is completed. Aggregated analytics may be retained longer when consent has been given. Server logs are retained for the period required by Turkish law.'] },
          { h: '6. Cookies and Consent Mode', p: ['We use Google Consent Mode v2. Advertising and analytics storage are denied by default and activate only after you choose "Accept all" in the consent banner. You can change your decision through "Manage cookies".'] },
          { h: '7. Sharing', p: ['We do not sell personal data. Reservation data is shared only with our reservation management system and, when needed, our valet team. Anonymous analytics may be shared with advertising platforms only after consent.'] },
          { h: '8. Your Rights', p: ['You may request access, correction, deletion, restriction, objection, data portability, or withdrawal of consent. To exercise your rights, contact <a href="mailto:info.sultanahmet@zeferan.com.tr">info.sultanahmet@zeferan.com.tr</a>.'] },
          { h: '9. Security', p: ['We apply reasonable administrative and technical safeguards, including HTTPS transport, access controls, and encrypted storage where applicable.'] },
          { h: '10. International Transfers', p: ['Where consented analytics services process data outside Türkiye or the EU, we rely on standard contractual clauses and the providers\' compliance frameworks.'] },
          { h: '11. Updates', p: ['We may update this policy. The last updated date above reflects the current version. Material changes may be communicated through the consent banner.'] },
          { h: '12. Complaints', p: ['If you believe your rights have been violated, you may complain to the Turkish Personal Data Protection Authority at <a href="https://www.kvkk.gov.tr">kvkk.gov.tr</a>, or to the relevant EU supervisory authority.'] }
        ]
      },
      tr: {
        title: 'Məxfilik Siyasəti',
        meta: 'Son yenilənmə: 2026-05-04',
        description: 'Zeferan Sultanahmet şəxsi məlumatları necə topladığını, emal etdiyini və qoruduğunu açıqlayan məxfilik siyasəti.',
        sections: [
          { h: '1. Məlumatların məsul şəxsi', p: ['Zeferan Sultanahmet, Emin Sinan, Piyer Loti Cd. No:30, 34126 Fatih/İstanbul, Türkiyə. Əlaqə: <a href="mailto:info.sultanahmet@zeferan.com.tr">info.sultanahmet@zeferan.com.tr</a> · <a href="tel:+902126382212">+90 212 638 22 12</a>.'] },
          { h: '2. Topladığımız məlumatlar', ul: ['<strong>Rezervasiya məlumatları:</strong> ad, telefon, e-poçt, qonaq sayı, tarix, saat, varsa avtomobil nömrəsi, xüsusi gün və pəhriz qeydləri.', '<strong>Texniki məlumatlar:</strong> IP ünvanı, brauzer, cihaz, yönləndirən URL və server qeydlərindəki zaman məlumatları.', '<strong>Cookie və oxşar texnologiyalar:</strong> analiz və reklam cookie-ləri yalnız razılıqdan sonra istifadə olunur.'] },
          { h: '3. Emal məqsədləri', ul: ['Rezervasiyanı yaratmaq, təsdiqləmək və idarə etmək.', 'Rezervasiya detalları ilə bağlı sizinlə əlaqə saxlamaq.', 'Razılıq olduqda xidmət və sayt təcrübəsini yaxşılaşdırmaq.', 'Qanuni qeyd saxlama öhdəliklərini yerinə yetirmək.'] },
          { h: '4. Hüquqi əsaslar', ul: ['Rezervasiya müqaviləsinin icrası.', 'Analiz, marketinq və reklam cookie-ləri üçün açıq razılığınız.', 'Saytın təhlükəsiz işlədilməsi üzrə qanuni maraqlar.', 'Tətbiq olunan qanuni öhdəliklər.'] },
          { h: '5. Saxlama müddəti', p: ['Rezervasiya əlaqə məlumatları ziyarət tamamlandıqdan sonra 6 saat ərzində aktiv sistemdən silinir. Razılıq verilmiş toplu analiz məlumatları daha uzun saxlanıla bilər. Server logları Türkiyə qanunvericiliyinin tələb etdiyi müddətdə saxlanılır.'] },
          { h: '6. Cookie və razılıq rejimi', p: ['Google Consent Mode v2 istifadə edirik. Reklam və analiz saxlaması standart olaraq bağlıdır və yalnız banner-də "Hamısını qəbul et" seçildikdən sonra aktivləşir. Qərarınızı "Cookie tənzimləri" ilə dəyişə bilərsiniz.'] },
          { h: '7. Paylaşım', p: ['Şəxsi məlumatları satmırıq. Rezervasiya məlumatları yalnız rezervasiya idarəetmə sistemi və lazım olduqda vale komandası ilə paylaşılır. Anonim analiz məlumatları yalnız razılıqdan sonra reklam platformaları ilə paylaşılır.'] },
          { h: '8. Hüquqlarınız', p: ['Məlumatlara giriş, düzəliş, silinmə, məhdudlaşdırma, etiraz, daşınma və razılığı geri götürmə hüquqlarınız var. Müraciət üçün: <a href="mailto:info.sultanahmet@zeferan.com.tr">info.sultanahmet@zeferan.com.tr</a>.'] },
          { h: '9. Təhlükəsizlik', p: ['HTTPS, giriş nəzarəti və uyğun hallarda şifrəli saxlama daxil olmaqla ağlabatan inzibati və texniki tədbirlər tətbiq edirik.'] },
          { h: '10. Xaricə ötürmə', p: ['Razılıq verilmiş analiz xidmətləri məlumatları Türkiyə və ya AB xaricində emal etdikdə standart müqavilə maddələrinə və təminatçıların uyğunluq çərçivələrinə əsaslanırıq.'] },
          { h: '11. Yeniliklər', p: ['Bu siyasət yenilənə bilər. Yuxarıdakı tarix cari versiyanı göstərir. Əhəmiyyətli dəyişikliklər razılıq banner-i vasitəsilə bildirilə bilər.'] },
          { h: '12. Şikayətlər', p: ['Hüquqlarınızın pozulduğunu düşünürsünüzsə, Türkiyə Şəxsi Məlumatların Qorunması Qurumuna <a href="https://www.kvkk.gov.tr">kvkk.gov.tr</a> ünvanından və ya müvafiq AB nəzarət orqanına müraciət edə bilərsiniz.'] }
        ]
      },
      ru: {
        title: 'Политика конфиденциальности',
        meta: 'Последнее обновление: 2026-05-04',
        description: 'Как Zeferan Sultanahmet собирает, обрабатывает и защищает персональные данные.',
        sections: [
          { h: '1. Контролер данных', p: ['Zeferan Sultanahmet, Emin Sinan, Piyer Loti Cd. No:30, 34126 Fatih/Стамбул, Турция. Контакты: <a href="mailto:info.sultanahmet@zeferan.com.tr">info.sultanahmet@zeferan.com.tr</a> · <a href="tel:+902126382212">+90 212 638 22 12</a>.'] },
          { h: '2. Какие данные мы собираем', ul: ['<strong>Данные бронирования:</strong> имя, телефон, e-mail, количество гостей, дата, время, номер автомобиля при указании, повод и диетические заметки.', '<strong>Технические данные:</strong> IP-адрес, браузер, устройство, источник перехода и временные метки в серверных журналах.', '<strong>Cookie и похожие технологии:</strong> аналитические и рекламные cookie используются только после согласия.'] },
          { h: '3. Цели обработки', ul: ['Создание, подтверждение и управление бронированиями.', 'Связь с вами по деталям бронирования.', 'Улучшение сервиса и сайта при наличии согласия.', 'Соблюдение юридических обязанностей по хранению записей.'] },
          { h: '4. Правовые основания', ul: ['Исполнение договора бронирования.', 'Ваше явное согласие на аналитические, маркетинговые и рекламные cookie.', 'Законный интерес в безопасной работе сайта.', 'Юридические обязанности, когда применимо.'] },
          { h: '5. Срок хранения', p: ['Контактные данные бронирования удаляются из активной системы в течение 6 часов после завершения визита. Агрегированная аналитика может храниться дольше при наличии согласия. Серверные журналы хранятся в сроки, требуемые законодательством Турции.'] },
          { h: '6. Cookie и режим согласия', p: ['Мы используем Google Consent Mode v2. Рекламное и аналитическое хранение по умолчанию запрещено и включается только после выбора "Принять все" в баннере. Решение можно изменить через "Управление cookie".'] },
          { h: '7. Передача данных', p: ['Мы не продаем персональные данные. Данные бронирования передаются только системе управления бронированиями и, при необходимости, команде valet. Анонимная аналитика передается рекламным платформам только после согласия.'] },
          { h: '8. Ваши права', p: ['Вы можете запросить доступ, исправление, удаление, ограничение обработки, возражение, переносимость данных или отзыв согласия. Для обращения: <a href="mailto:info.sultanahmet@zeferan.com.tr">info.sultanahmet@zeferan.com.tr</a>.'] },
          { h: '9. Безопасность', p: ['Мы применяем разумные административные и технические меры, включая HTTPS, контроль доступа и шифрованное хранение там, где это применимо.'] },
          { h: '10. Международная передача', p: ['Если согласованные аналитические сервисы обрабатывают данные вне Турции или ЕС, мы опираемся на стандартные договорные положения и механизмы соответствия поставщиков.'] },
          { h: '11. Обновления', p: ['Политика может обновляться. Дата выше отражает текущую версию. Существенные изменения могут сообщаться через баннер согласия.'] },
          { h: '12. Жалобы', p: ['Если вы считаете, что ваши права нарушены, вы можете обратиться в турецкий орган по защите персональных данных на <a href="https://www.kvkk.gov.tr">kvkk.gov.tr</a> или в соответствующий надзорный орган ЕС.'] }
        ]
      },
      tk: {
        title: 'Gizlilik Politikası',
        meta: 'Son güncelleme: 2026-05-04',
        description: 'Zeferan Sultanahmet kişisel verileri nasıl topladığını, işlediğini ve koruduğunu açıklayan gizlilik politikası.',
        sections: [
          { h: '1. Veri Sorumlusu', p: ['Zeferan Sultanahmet, Emin Sinan, Piyer Loti Cd. No:30, 34126 Fatih/İstanbul, Türkiye. İletişim: <a href="mailto:info.sultanahmet@zeferan.com.tr">info.sultanahmet@zeferan.com.tr</a> · <a href="tel:+902126382212">+90 212 638 22 12</a>.'] },
          { h: '2. Topladığımız Veriler', ul: ['<strong>Rezervasyon verileri:</strong> ad, telefon, e-posta, kişi sayısı, tarih, tercih edilen saat, varsa araç plakası, özel gün ve diyet notları.', '<strong>Teknik veriler:</strong> IP adresi, tarayıcı, cihaz, yönlendiren URL ve standart sunucu kayıtlarındaki zaman bilgileri.', '<strong>Çerezler ve benzeri teknolojiler:</strong> analiz veya reklam çerezleri yalnızca onaydan sonra kullanılır.'] },
          { h: '3. İşleme Amaçları', ul: ['Rezervasyonu oluşturmak, onaylamak ve yönetmek.', 'Rezervasyon detayları hakkında sizinle iletişim kurmak.', 'Onayınız varsa hizmet kalitesini ve site deneyimini geliştirmek.', 'Yasal kayıt saklama yükümlülüklerini yerine getirmek.'] },
          { h: '4. Hukuki Sebepler', ul: ['Rezervasyon sözleşmesinin ifası.', 'Analiz, pazarlama ve reklam çerezleri için açık rızanız.', 'Sitenin güvenli şekilde işletilmesine yönelik meşru menfaat.', 'Uygulanabilir yasal yükümlülükler.'] },
          { h: '5. Saklama Süresi', p: ['Rezervasyon iletişim verileri ziyaret tamamlandıktan sonra 6 saat içinde aktif sistemden kaldırılır. Toplulaştırılmış analiz verileri, rıza verilmişse daha uzun süre saklanabilir. Sunucu kayıtları Türk hukukunun gerektirdiği süre boyunca tutulur.'] },
          { h: '6. Çerezler ve Onay Modu', p: ['Google Consent Mode v2 kullanıyoruz. Reklam ve analiz depolaması varsayılan olarak kapalıdır; yalnızca onay banner’ında "Tümünü kabul et" seçildiğinde etkinleşir. Kararınızı "Çerez tercihleri" üzerinden değiştirebilirsiniz.'] },
          { h: '7. Paylaşım', p: ['Kişisel verileri satmıyoruz. Rezervasyon verileri yalnızca rezervasyon yönetim sistemiyle ve gerektiğinde vale ekibimizle paylaşılır. Anonim analiz verileri yalnızca onaydan sonra reklam platformlarıyla paylaşılabilir.'] },
          { h: '8. Haklarınız', p: ['Erişim, düzeltme, silme, işlemeyi sınırlama, itiraz, veri taşınabilirliği ve rızayı geri çekme haklarınız vardır. Başvuru için: <a href="mailto:info.sultanahmet@zeferan.com.tr">info.sultanahmet@zeferan.com.tr</a>.'] },
          { h: '9. Güvenlik', p: ['HTTPS taşıma, erişim kontrolü ve uygun yerlerde şifreli saklama dahil makul idari ve teknik tedbirler uygularız.'] },
          { h: '10. Yurtdışı Aktarım', p: ['Onay verilen analiz hizmetleri verileri Türkiye veya AB dışında işlediğinde standart sözleşme maddelerine ve sağlayıcıların uyumluluk çerçevelerine dayanırız.'] },
          { h: '11. Güncellemeler', p: ['Bu politika güncellenebilir. Yukarıdaki tarih mevcut versiyonu gösterir. Esaslı değişiklikler onay banner’ı üzerinden bildirilebilir.'] },
          { h: '12. Şikayetler', p: ['Haklarınızın ihlal edildiğini düşünüyorsanız Türkiye Kişisel Verileri Koruma Kurumu’na <a href="https://www.kvkk.gov.tr">kvkk.gov.tr</a> üzerinden veya ilgili AB denetim otoritesine başvurabilirsiniz.'] }
        ]
      }
    },
    kvkk: {
      en: {
        title: 'KVKK Notice',
        meta: 'Last updated: 2026-05-04',
        description: 'Personal data processing notice of Zeferan Sultanahmet under Turkish Personal Data Protection Law No. 6698.',
        sections: [
          { h: '1. Data Controller', p: ['As Zeferan Sultanahmet, we act as data controller under Turkish Personal Data Protection Law No. 6698 and provide this notice to our visitors and guests.'] },
          { h: '2. Processed Personal Data', ul: ['Reservation identity and contact details.', 'Reservation date, time, guest count, notes, and optional vehicle plate for valet service.', 'Technical log data such as IP address, browser, device, and timestamps.', 'Cookie choices and consent records.'] },
          { h: '3. Purposes of Processing', ul: ['Managing reservation requests and restaurant operations.', 'Contacting guests about reservations.', 'Providing valet and guest services when requested.', 'Ensuring website security and complying with legal obligations.', 'Improving service quality when explicit consent is given.'] },
          { h: '4. Legal Grounds', ul: ['Processing is necessary for reservation service performance.', 'Processing is necessary for legal obligations.', 'Processing is necessary for legitimate interests, provided fundamental rights are not harmed.', 'Explicit consent for analytics and advertising cookies.'] },
          { h: '5. Transfer of Data', p: ['Personal data may be transferred to service providers, reservation infrastructure, valet team, and legally authorized public institutions where necessary and proportionate.'] },
          { h: '6. Method of Collection', p: ['Data is collected through reservation forms, telephone or e-mail communication, website logs, cookie consent tools, and direct interactions at the restaurant.'] },
          { h: '7. Retention', p: ['Reservation contact data is removed from active systems within 6 hours after the visit is completed. Other data is retained only for periods required by law or operational necessity.'] },
          { h: '8. Your KVKK Article 11 Rights', p: ['You may ask whether your data is processed, request information, correction, deletion or destruction, object to automated results, and request compensation for damages. Contact: <a href="mailto:info.sultanahmet@zeferan.com.tr">info.sultanahmet@zeferan.com.tr</a>.'] },
          { h: '9. Complaints', p: ['If you believe your rights have been violated, you may apply to the Turkish Personal Data Protection Authority at <a href="https://www.kvkk.gov.tr">kvkk.gov.tr</a>.'] }
        ]
      },
      tr: {
        title: 'KVKK Bildirişi',
        meta: 'Son yenilənmə: 2026-05-04',
        description: '6698 saylı Türkiyə KVKK çərçivəsində Zeferan Sultanahmet şəxsi məlumatların emalı bildirişi.',
        sections: [
          { h: '1. Məlumatların məsul şəxsi', p: ['Zeferan Sultanahmet olaraq 6698 saylı Türkiyə Şəxsi Məlumatların Qorunması Qanunu çərçivəsində məlumatların məsul şəxsi kimi bu bildirişi təqdim edirik.'] },
          { h: '2. Emal olunan şəxsi məlumatlar', ul: ['Rezervasiya üçün kimlik və əlaqə məlumatları.', 'Tarix, saat, qonaq sayı, qeydlər və vale xidməti üçün opsional avtomobil nömrəsi.', 'IP ünvanı, brauzer, cihaz və zaman qeydləri kimi texniki log məlumatları.', 'Cookie seçimləri və razılıq qeydləri.'] },
          { h: '3. Emal məqsədləri', ul: ['Rezervasiya müraciətlərini və restoran əməliyyatlarını idarə etmək.', 'Rezervasiya ilə bağlı qonaqlarla əlaqə saxlamaq.', 'Tələb edildikdə vale və qonaq xidmətləri göstərmək.', 'Sayt təhlükəsizliyini təmin etmək və qanuni öhdəlikləri yerinə yetirmək.', 'Açıq razılıq olduqda xidmət keyfiyyətini yaxşılaşdırmaq.'] },
          { h: '4. Hüquqi əsaslar', ul: ['Rezervasiya xidmətinin icrası üçün zəruri olması.', 'Qanuni öhdəliklərin yerinə yetirilməsi üçün zəruri olması.', 'Əsas hüquqlara zərər vermədən qanuni maraqlar üçün zəruri olması.', 'Analiz və reklam cookie-ləri üçün açıq razılıq.'] },
          { h: '5. Məlumatların ötürülməsi', p: ['Şəxsi məlumatlar zəruri və mütənasib olduqda xidmət təminatçılarına, rezervasiya infrastrukturuna, vale komandasına və səlahiyyətli dövlət qurumlarına ötürülə bilər.'] },
          { h: '6. Toplama üsulu', p: ['Məlumatlar rezervasiya formaları, telefon və e-poçt yazışmaları, sayt logları, cookie razılıq alətləri və restorandakı birbaşa əlaqə vasitəsilə toplanır.'] },
          { h: '7. Saxlama müddəti', p: ['Rezervasiya əlaqə məlumatları ziyarət tamamlandıqdan sonra 6 saat ərzində aktiv sistemlərdən silinir. Digər məlumatlar yalnız qanun və əməliyyat ehtiyacı tələb etdiyi müddətdə saxlanılır.'] },
          { h: '8. KVKK 11-ci maddə üzrə hüquqlar', p: ['Məlumatlarınızın emal olunub-olunmadığını soruşa, məlumat, düzəliş, silinmə və ya məhv edilmə tələb edə, avtomatik nəticələrə etiraz edə və zərər olduqda kompensasiya tələb edə bilərsiniz. Əlaqə: <a href="mailto:info.sultanahmet@zeferan.com.tr">info.sultanahmet@zeferan.com.tr</a>.'] },
          { h: '9. Şikayət', p: ['Hüquqlarınızın pozulduğunu düşünürsünüzsə, Türkiyə Şəxsi Məlumatların Qorunması Qurumuna <a href="https://www.kvkk.gov.tr">kvkk.gov.tr</a> ünvanından müraciət edə bilərsiniz.'] }
        ]
      },
      ru: {
        title: 'Уведомление KVKK',
        meta: 'Последнее обновление: 2026-05-04',
        description: 'Уведомление Zeferan Sultanahmet об обработке персональных данных в рамках турецкого закона KVKK №6698.',
        sections: [
          { h: '1. Контролер данных', p: ['Zeferan Sultanahmet выступает контролером данных в рамках турецкого закона о защите персональных данных №6698 и предоставляет это уведомление посетителям и гостям.'] },
          { h: '2. Обрабатываемые данные', ul: ['Идентификационные и контактные данные для бронирования.', 'Дата, время, количество гостей, заметки и опциональный номер автомобиля для valet.', 'Технические журналы: IP-адрес, браузер, устройство и временные метки.', 'Выбор cookie и записи согласия.'] },
          { h: '3. Цели обработки', ul: ['Управление запросами бронирования и ресторанными операциями.', 'Связь с гостями по бронированию.', 'Предоставление valet и гостевых услуг при запросе.', 'Обеспечение безопасности сайта и выполнение юридических обязанностей.', 'Улучшение качества сервиса при наличии явного согласия.'] },
          { h: '4. Правовые основания', ul: ['Необходимость для исполнения услуги бронирования.', 'Необходимость для соблюдения юридических обязанностей.', 'Законные интересы при условии соблюдения основных прав.', 'Явное согласие на аналитические и рекламные cookie.'] },
          { h: '5. Передача данных', p: ['Персональные данные могут передаваться поставщикам услуг, инфраструктуре бронирования, команде valet и уполномоченным государственным органам, когда это необходимо и соразмерно.'] },
          { h: '6. Способ сбора', p: ['Данные собираются через формы бронирования, телефон, e-mail, журналы сайта, инструменты согласия cookie и прямое взаимодействие в ресторане.'] },
          { h: '7. Срок хранения', p: ['Контактные данные бронирования удаляются из активных систем в течение 6 часов после завершения визита. Остальные данные хранятся только в сроки, требуемые законом или операционной необходимостью.'] },
          { h: '8. Права по статье 11 KVKK', p: ['Вы можете узнать, обрабатываются ли ваши данные, запросить информацию, исправление, удаление или уничтожение, возразить против автоматизированных результатов и требовать компенсацию ущерба. Контакт: <a href="mailto:info.sultanahmet@zeferan.com.tr">info.sultanahmet@zeferan.com.tr</a>.'] },
          { h: '9. Жалобы', p: ['Если вы считаете, что ваши права нарушены, вы можете обратиться в турецкий орган по защите персональных данных на <a href="https://www.kvkk.gov.tr">kvkk.gov.tr</a>.'] }
        ]
      },
      tk: {
        title: 'KVKK Aydınlatma Metni',
        meta: 'Son güncelleme: 2026-05-04',
        description: '6698 sayılı KVKK kapsamında Zeferan Sultanahmet kişisel veri işleme aydınlatma metni.',
        sections: [
          { h: '1. Veri Sorumlusu', p: ['Zeferan Sultanahmet olarak, 6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında veri sorumlusu sıfatıyla ziyaretçilerimize ve müşterilerimize bu aydınlatma metnini sunarız.'] },
          { h: '2. İşlenen Kişisel Veriler', ul: ['Rezervasyon için kimlik ve iletişim bilgileriniz.', 'Tarih, saat, kişi sayısı, notlar ve vale hizmeti için opsiyonel araç plakası.', 'IP adresi, tarayıcı, cihaz ve zaman damgası gibi teknik log verileri.', 'Çerez tercihleri ve rıza kayıtları.'] },
          { h: '3. İşleme Amaçları', ul: ['Rezervasyon taleplerini ve restoran operasyonlarını yönetmek.', 'Rezervasyonunuzla ilgili sizinle iletişim kurmak.', 'Talep edildiğinde vale ve misafir hizmetleri sunmak.', 'Site güvenliğini sağlamak ve yasal yükümlülükleri yerine getirmek.', 'Açık rızanız olduğunda hizmet kalitesini iyileştirmek.'] },
          { h: '4. Hukuki Sebepler', ul: ['Rezervasyon hizmetinin ifası için zorunlu olması.', 'Yasal yükümlülüklerin yerine getirilmesi için zorunlu olması.', 'Temel haklara zarar vermemek kaydıyla meşru menfaatlerimiz için zorunlu olması.', 'Analiz ve reklam çerezleri için açık rızanız.'] },
          { h: '5. Veri Aktarımı', p: ['Kişisel veriler, gerekli ve ölçülü olduğu durumlarda hizmet sağlayıcılarına, rezervasyon altyapısına, vale ekibine ve yetkili kamu kurumlarına aktarılabilir.'] },
          { h: '6. Toplama Yöntemi', p: ['Veriler rezervasyon formları, telefon veya e-posta iletişimi, web sitesi logları, çerez rıza araçları ve restorandaki doğrudan etkileşimler yoluyla toplanır.'] },
          { h: '7. Saklama Süresi', p: ['Rezervasyon iletişim verileri ziyaret tamamlandıktan sonra 6 saat içinde aktif sistemlerden kaldırılır. Diğer veriler yalnızca mevzuatın veya operasyonel gerekliliğin zorunlu kıldığı süre boyunca saklanır.'] },
          { h: '8. KVKK Madde 11 Haklarınız', p: ['Verilerinizin işlenip işlenmediğini öğrenme, bilgi talep etme, düzeltme, silme veya yok etme isteme, otomatik sonuçlara itiraz etme ve zarar halinde tazmin talep etme haklarınız vardır. Başvuru için: <a href="mailto:info.sultanahmet@zeferan.com.tr">info.sultanahmet@zeferan.com.tr</a>.'] },
          { h: '9. Şikayet', p: ['Haklarınızın ihlal edildiğini düşünüyorsanız Kişisel Verileri Koruma Kurumu’na <a href="https://www.kvkk.gov.tr">kvkk.gov.tr</a> üzerinden başvurabilirsiniz.'] }
        ]
      }
    }
  };

  function validLang(value) {
    return value === 'en' || value === 'tr' || value === 'ru' || value === 'tk';
  }

  function storedLang() {
    try {
      var value = localStorage.getItem(LANG_STORAGE_KEY);
      return validLang(value) ? value : null;
    } catch (e) {
      return null;
    }
  }

  function writeLang(lang) {
    try { localStorage.setItem(LANG_STORAGE_KEY, lang); } catch (e) {}
  }

  function langFromURL() {
    var seg = (location.pathname.split('/').filter(Boolean)[0] || '').toLowerCase();
    return URL_TO_LANG[seg] || null;
  }

  function detectSystemLang() {
    var langs = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || 'en'];
    for (var i = 0; i < langs.length; i++) {
      var code = String(langs[i] || '').slice(0, 2).toLowerCase();
      if (code === 'az') return 'tr';
      if (code === 'ru') return 'ru';
      if (code === 'tr') return 'tk';
      if (code === 'en') return 'en';
    }
    return 'en';
  }

  function currentPage() {
    var parts = location.pathname.split('/').filter(Boolean);
    if (parts.length && URL_TO_LANG[parts[0].toLowerCase()]) parts.shift();
    return parts[0] === 'kvkk' ? 'kvkk' : 'privacy';
  }

  function localizedPath(route, lang) {
    var slug = LANG_TO_URL[lang] || 'en';
    if (route === 'home') return lang === 'en' ? '/' : '/' + slug + '/';
    if (route === 'menu') return '/' + slug + '/menu';
    if (route === 'privacy' || route === 'kvkk') {
      return lang === 'en' ? '/' + route : '/' + slug + '/' + route;
    }
    return '/';
  }

  function localizedDataValue(el, key, lang) {
    return el.getAttribute('data-' + key + '-' + lang) || el.getAttribute('data-' + key + '-en') || '';
  }

  function applyCommonTranslations(lang) {
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      var group = COMMON[key];
      if (group && group[lang]) el.innerHTML = group[lang];
    });
    document.querySelectorAll('[data-aria-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-aria-i18n');
      var group = COMMON[key];
      if (group && group[lang]) el.setAttribute('aria-label', group[lang]);
    });
    document.querySelectorAll('[data-route]').forEach(function (el) {
      var route = el.getAttribute('data-route');
      el.setAttribute('href', localizedPath(route, lang));
    });
  }

  function renderBlocks(sections) {
    return sections.map(function (section) {
      var html = '<h2>' + section.h + '</h2>';
      if (section.p) {
        html += section.p.map(function (text) { return '<p>' + text + '</p>'; }).join('');
      }
      if (section.ul) {
        html += '<ul>' + section.ul.map(function (text) { return '<li>' + text + '</li>'; }).join('') + '</ul>';
      }
      return html;
    }).join('');
  }

  function renderLegal(page, lang) {
    var main = document.querySelector('[data-legal-page]');
    if (!main) return;
    var data = CONTENT[page] && (CONTENT[page][lang] || CONTENT[page].en);
    if (!data) return;
    main.innerHTML =
      '<h1>' + data.title + '</h1>' +
      '<p class="legal-meta">' + data.meta + '</p>' +
      renderBlocks(data.sections) +
      '<p><a href="' + localizedPath('home', lang) + '" class="legal-back">← ' + COMMON.back[lang] + '</a></p>';

    document.title = data.title + ' — Zeferan Sultanahmet';
    var meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', data.description);
    var canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute('href', location.origin + localizedPath(page, lang));
  }

  function updateControls(lang) {
    document.querySelectorAll('.lang-option').forEach(function (opt) {
      opt.classList.toggle('active', opt.getAttribute('data-lang') === lang);
    });
    var currentText = document.querySelector('.lang-current-text');
    if (currentText) currentText.textContent = LANG_LABELS[lang] || 'EN';
  }

  function updateURL(page, lang) {
    var nextPath = localizedPath(page, lang);
    if (nextPath !== location.pathname) {
      try { (function(){})(null, '', nextPath + location.search + location.hash); } catch (e) {}
    }
  }

  function setLanguage(lang, options) {
    if (!validLang(lang)) lang = 'en';
    var page = currentPage();
    writeLang(lang);
    document.documentElement.lang = HTML_LANG[lang] || 'en';
    if (!options || options.updateURL !== false) updateURL(page, lang);
    applyCommonTranslations(lang);
    renderLegal(page, lang);
    updateControls(lang);
    if (window.zeferanConsent && typeof window.zeferanConsent.setLanguage === 'function') {
      window.zeferanConsent.setLanguage(lang);
    }
    try {
      window.dispatchEvent(new CustomEvent('zeferan:languagechange', { detail: { lang: lang } }));
    } catch (e) {}
  }

  function updateLogos(isLight) {
    var src = isLight ? '/your-repo/Logo-light.webp' : '/your-repo/Logo.webp';
    document.querySelectorAll('.nav-logo-img, .footer-logo-img').forEach(function (img) {
      img.src = src;
    });
  }

  function initTheme() {
    var saved = 'dark';
    try { saved = localStorage.getItem('zeferan-theme') || 'dark'; } catch (e) {}
    document.body.classList.toggle('theme-light', saved === 'light');
    updateLogos(saved === 'light');

    var toggle = document.getElementById('theme-toggle');
    if (!toggle) return;
    toggle.addEventListener('click', function () {
      var isLight = !document.body.classList.contains('theme-light');
      document.body.classList.toggle('theme-light', isLight);
      try { localStorage.setItem('zeferan-theme', isLight ? 'light' : 'dark'); } catch (e) {}
      updateLogos(isLight);
    });
  }

  function initLanguageDropdown() {
    var dropdown = document.getElementById('lang-dropdown');
    var toggle = document.getElementById('lang-toggle');
    var menu = document.getElementById('lang-menu');
    if (!dropdown || !toggle || !menu) return;

    toggle.addEventListener('click', function (event) {
      event.stopPropagation();
      dropdown.classList.toggle('open');
    });
    menu.querySelectorAll('.lang-option').forEach(function (opt) {
      opt.addEventListener('click', function (event) {
        event.stopPropagation();
        setLanguage(opt.getAttribute('data-lang'));
        dropdown.classList.remove('open');
      });
    });
    document.addEventListener('click', function () {
      dropdown.classList.remove('open');
    });
  }

  function init() {
    initTheme();
    initLanguageDropdown();
    setLanguage(langFromURL() || storedLang() || detectSystemLang());
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
