# Farm Neighbors — دليل التشغيل والنشر

لعبة مزرعة ويب PWA للهواتف Android وiPhone والكمبيوتر.

## ملفات المشروع

- [تحميل حزمة اللعبة](./FarmNeighbors-Web-MVP.zip).
- [الدليل الإنجليزي](./README.md).

## التشغيل المحلي

فك ضغط ZIP، ثم ادخل إلى مجلد:

`FarmNeighbors_Web_Project/web/`

وشغّل:

```bash
python -m http.server 8080
```

افتح `http://localhost:8080`.

## إعداد Supabase

1. أنشئ مشروع Supabase.
2. نفّذ ملفات SQL داخل `FarmNeighbors_Web_Project/Backend/supabase/migrations/`.
3. أضف Project URL وPublic anon/publishable key داخل `web/config.js`.
4. ممنوع وضع Service Role أو Secret Key داخل كود المتصفح.

## فتح المستودع للعامة

المستودع خاص حاليًا. من GitHub افتح:

**Settings → General → Danger Zone → Change visibility → Make public**

ثم فعّل Pages:

**Settings → Pages → Build and deployment → Source: GitHub Actions**

بعد تفعيل Pages، سير العمل الموجود في `.github/workflows/deploy-pwa.yml` ينشر اللعبة تلقائيًا عند تحديث الملفات أو تشغيل Workflow يدويًا.

## التثبيت

- iPhone: افتح رابط HTTPS في Safari → Share → Add to Home Screen → فعّل Open as Web App.
- Android: افتح رابط HTTPS في Chrome → Install app أو Add to Home screen.

## حالة MVP

نسخة أولية وليست لعبة Multiplayer مكتملة. الزراعة والمعاينة المحلية متاحتان. اللعب السحابي يتطلب Supabase واختبار هاتفين. حركة الشخصيات المشتركة والدردشة والتجارة المباشرة والحيوانات والمصانع والفعاليات لم تكتمل بعد.
