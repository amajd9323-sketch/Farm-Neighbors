# Farm Neighbors — دليل التشغيل

هذه نسخة ويب PWA تعمل على Android وiPhone والكمبيوتر، ويمكن تثبيتها على الشاشة الرئيسية.

## تشغيل المشروع

1. نزّل [FarmNeighbors-Web-MVP.zip](./FarmNeighbors-Web-MVP.zip).
2. فك ضغط الملف.
3. ادخل مجلد `web`.
4. شغّل خادمًا محليًا:

```bash
python -m http.server 8080
```

5. افتح `http://localhost:8080`.

## اللعب على الهاتفين

- Android: افتح رابط HTTPS في Chrome ثم اختر Install app.
- iPhone: افتح رابط HTTPS في Safari ثم Share → Add to Home Screen → فعّل Open as Web App → Add.

## تشغيل اللعب السحابي

1. أنشئ مشروع Supabase.
2. نفّذ ملفي SQL داخل `Backend/supabase/migrations`.
3. ضع Project URL وPublic anon/publishable key داخل `web/config.js`.
4. انشر محتويات مجلد `web` على استضافة HTTPS.
5. أنشئ حسابين واختبر دعوة الجيران من هاتفين.

لا تضع service_role أو secret key داخل ملفات الويب.

## الموجود في MVP

- مزرعة 4×4.
- زراعة وسقي ونمو وحصاد 4 محاصيل.
- عملات وبذور ومخزن وبيع وXP ومستويات.
- العربية RTL والإنجليزية LTR.
- PWA وService Worker وأيقونات تثبيت.
- وضع معاينة محلي.
- أساس Supabase Auth وPostgreSQL RPC ودعوات الجيران والحضور.

## ما لم يكتمل

المعاينة المحلية لا تدعم اللعب المشترك. اللعب السحابي يحتاج إعداد Supabase واختبار هاتفين. حركة الشخصيات المشتركة لحظيًا والدردشة والتجارة المباشرة والحيوانات والمصانع والفعاليات لم تكتمل بعد.

المستودع حاليًا Private. لا تغيّر خصوصيته قبل تقرير ما إذا كنت تريد نشر الكود للعامة. GitHub Pages قد يتطلب خطة مدفوعة للمستودعات الخاصة؛ يمكن استخدام استضافة HTTPS أخرى دون جعل الكود عامًا.
