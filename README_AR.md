# Farm Neighbors — دليل التشغيل بالعربية

لعبة مزرعة اجتماعية مبنية على Unity 6.3. هذه الحزمة هي MVP تأسيسي، وليست إصدارًا تجاريًا مكتملًا.

## المتطلبات
- Unity 6.3 عبر Unity Hub.
- Android Build Support لبناء APK.
- مشروع Supabase لاستخدام الحسابات والحفظ السحابي.

## التشغيل
1. نزّل `FarmNeighbors_MVP.zip` من المستودع وفك الضغط.
2. افتح مجلد المشروع المستخرج عبر Unity Hub.
3. من قائمة Unity اختر **Farm Neighbors → Build MVP Scene**.
4. اضغط Play لتشغيل المزرعة داخل المحرر.

## ربط Supabase
1. أنشئ مشروع Supabase.
2. نفّذ ملف SQL الموجود داخل `Backend/supabase/migrations` في SQL Editor.
3. افتح إعدادات المشروع في Unity وأدخل Project URL وPublishable/anon key فقط.
4. لا تضع Service Role أو Secret key داخل تطبيق الهاتف.

## بناء Android
1. ثبّت Android Build Support من Unity Hub.
2. من Unity افتح File → Build Profiles.
3. اختر Android، ثم Switch Platform.
4. أضف المشهد الذي أنشأه Builder إلى قائمة المشاهد.
5. اضغط Build لإنتاج APK.

## الموجود حاليًا
- أرض مزرعة 4×4.
- شراء بذور وزراعة وسقي ونمو وحصاد.
- أربعة محاصيل أساسية.
- Coins وXP ومستويات ومخزن وبيع وشراء.
- حفظ محلي.
- أساس ربط Supabase Auth وPostgreSQL.
- SQL للتحقق من العمليات الاقتصادية في الخادم.
- أساس دعوات الجيران.
- ملفات ترجمة عربية وإنجليزية.

## ما لم يكتمل بعد
المزامنة اللحظية لحركة الشخصيات، الدردشة داخل اللعبة، التجارة المباشرة المكتملة، واختبار هاتفين حقيقيين. يلزم فتح المشروع في Unity وإجراء Compile وبناء Android على جهاز يحتوي وحدات البناء المطلوبة.

## الفحص الساكن
بعد فك الضغط شغّل:

```bash
python tools/validate_project.py
```
