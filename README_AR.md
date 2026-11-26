# Farm Neighbors — اللعبة ورابط التثبيت

**رابط اللعبة:** https://amajd9323-sketch.github.io/Farm-Neighbors/

اللعبة تعمل على Android وiPhone والكمبيوتر من المتصفح، ويمكن تثبيتها كتطبيق PWA دون متجر.

## تحميل المشروع

[تحميل حزمة اللعبة](./FarmNeighbors-Web-MVP.zip)

## التثبيت على الهاتف

- iPhone: افتح الرابط في Safari → Share → Add to Home Screen → فعّل Open as Web App.
- Android: افتح الرابط في Chrome → Install app أو Add to Home screen.

## اللعب

المعاينة المحلية تدعم الزراعة والسقي والنمو والحصاد على جهاز واحد. ليست Multiplayer مشتركة بعد.

لتفعيل الحسابات السحابية ودعوات الجيران:
1. أنشئ مشروع Supabase.
2. نفّذ ملفي SQL داخل `FarmNeighbors_Web_Project/Backend/supabase/migrations/`.
3. ضع Project URL وPublic anon/publishable key داخل `web/config.js`.
4. لا تضع Service Role أو Secret Key داخل كود المتصفح.

## الحالة

هذه MVP مبكرة. حركة اللاعبين اللحظية والدردشة والتجارة المباشرة واختبار هاتفين لم تكتمل بعد. يلزم إعداد Supabase لاستخدام الحسابات والحفظ السحابي.

## النشر

GitHub Actions يستخرج مجلد `web/` من ZIP وينشره تلقائيًا على GitHub Pages عند تحديث الحزمة أو Workflow.
