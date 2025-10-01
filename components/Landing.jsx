'use client';
import { useState } from "react";
import { Check, Globe2, Package, Boxes, Truck, Plane, Ship, ShieldCheck, Languages, BadgeCheck, Calculator, Phone, Mail, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

const dict={ru:{brand:"TAJAP Co LTD",heroTitle:"Ваш байер и экспорт из Японии",heroSubtitle:"Покупаем, проверяем и доставляем из Японии в СНГ и мир. Просто, быстро, честно.",ctaQuote:"Запросить расчёт",ctaConsult:"Бесплатная консультация",badgeJapan:"Основано в Японии",badgeLang:"RU / EN / 日本語 / Тоҷикӣ",howTitle:"Как это работает",servicesTitle:"Услуги",pricingTitle:"Тарифы и комиссия",pricingNote:"Ниже рынка, прозрачная маржа",calcTitle:"Быстрый расчёт доставки",trustTitle:"Почему нам доверяют",contactTitle:"Связаться с нами",contactSubtitle:"Ответим в тот же день (JP/EN/RU/TG)",formName:"Ваше имя",formEmail:"Email или Telegram",formMsg:"Сообщение",formBtn:"Отправить",footerLegal:"© "},en:{brand:"TAJAP Co LTD",heroTitle:"Your buyer & exporter in Japan",heroSubtitle:"Sourcing, QC and shipping from Japan worldwide. Simple. Fast. Honest.",ctaQuote:"Get a quote",ctaConsult:"Free consultation",badgeJapan:"Based in Japan",badgeLang:"RU / EN / 日本語 / Тоҷикӣ",howTitle:"How it works",servicesTitle:"Services",pricingTitle:"Pricing & Fees",pricingNote:"Below market, clear margin",calcTitle:"Quick shipping quote",trustTitle:"Why clients trust us",contactTitle:"Contact us",contactSubtitle:"Same‑day reply (JP/EN/RU/TG)",formName:"Your name",formEmail:"Email or Telegram",formMsg:"Message",formBtn:"Send",footerLegal:"© "},ja:{brand:"TAJAP Co LTD",heroTitle:"日本のバイヤー＆輸出",heroSubtitle:"仕入れ・検品・発送をワンストップで。",ctaQuote:"お見積り",ctaConsult:"無料相談",badgeJapan:"日本法人",badgeLang:"RU / EN / 日本語 / Тоҷикӣ",howTitle:"流れ",servicesTitle:"サービス",pricingTitle:"料金",pricingNote:"市場より有利・透明",calcTitle:"簡易見積り",trustTitle:"選ばれる理由",contactTitle:"お問い合わせ",contactSubtitle:"当日返信（JP/EN/RU/TG）",formName:"お名前",formEmail:"メールまたはTelegram",formMsg:"メッセージ",formBtn:"送信",footerLegal:"© "},tg:{brand:"TAJAP Co LTD",heroTitle:"Хидмат аз Ҷопон",heroSubtitle:"Харид, санҷиш ва расонидан ба ҷаҳон.",ctaQuote:"Ҳисоб",ctaConsult:"Маслиҳати ройгон",badgeJapan:"Дар Ҷопон қайд шудааст",badgeLang:"RU / EN / 日本語 / Тоҷикӣ",howTitle:"Чӣ гуна кор мекунад",servicesTitle:"Хидматҳо",pricingTitle:"Тарифҳо",pricingNote:"Поёнтар аз бозор",calcTitle:"Ҳисобкунак",trustTitle:"Сабаби эътимод",contactTitle:"Тамос",contactSubtitle:"Ҷавоб дар ҳамон рӯз",formName:"Ном",formEmail:"Email ё Telegram",formMsg:"Паём",formBtn:"Фиристодан",footerLegal:"© "}};

export default function Landing(){
  const [lang,setLang]=useState('ru'); const t=dict[lang];
  const [mode,setMode]=useState('air'); const [region,setRegion]=useState('cis'); const [plan,setPlan]=useState('standard');
  const [weight,setWeight]=useState('2'); const [l,setL]=useState('20'); const [w,setW]=useState('15'); const [h,setH]=useState('10');
  const [insure,setInsure]=useState(true); const [result,setResult]=useState(null);

  const toNum=(v,d=0)=>{const n=parseFloat(String(v||'').replace(',','.'));return Number.isFinite(n)?n:d;}
  const yen=(x)=>new Intl.NumberFormat('ja-JP',{style:'currency',currency:'JPY',maximumFractionDigits:0}).format(Math.max(0,Math.round(x)));
  const usd=(x,r=150)=>new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0}).format(Math.max(0,Math.round(x/r)));

  function calcQuote(){
    const kg=Math.max(0.1,toNum(weight)), cmL=Math.max(1,toNum(l)), cmW=Math.max(1,toNum(w)), cmH=Math.max(1,toNum(h));
    const volDiv=mode==='air'?6000:1000000/167, volKg=(cmL*cmW*cmH)/volDiv, chargeable=Math.max(kg,volKg);
    const base={air:{cis:1800,eu:2000,me:1900,na:2100,other:2200},sea:{cis:700,eu:800,me:750,na:900,other:950}};
    const minFee={air:3500,sea:8000}, handlingFlat=600, handlingPerKg=mode==='air'?120:80;
    const servicePct=plan==='lite'?0.03:plan==='standard'?0.05:0.02, insurancePct=insure?0.01:0;
    const ratePerKg=base[mode][region], shippingRaw=Math.max(minFee[mode], chargeable*ratePerKg);
    const handling=handlingFlat+handlingPerKg*chargeable, serviceFee=(shippingRaw+handling)*servicePct, insurance=shippingRaw*insurancePct;
    const total=shippingRaw+handling+serviceFee+insurance;
    setResult({kg,volKg,chargeable,ratePerKg,shippingRaw,handling,serviceFee,insurance,total,mode,region,plan});
  }

  return (<div className="min-h-screen bg-white text-gray-900">
    <header className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2"><Globe2 className="w-6 h-6"/><span className="font-semibold">{t.brand}</span></div>
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 text-sm text-gray-600"><ShieldCheck className="w-4 h-4"/><span>{t.badgeJapan}</span></div>
          <div className="flex items-center gap-2"><Languages className="w-5 h-5"/>
            <select className="border rounded-lg px-2 py-1 text-sm" value={lang} onChange={e=>setLang(e.target.value)}>
              <option value="ru">RU</option><option value="en">EN</option><option value="ja">日本語</option><option value="tg">Тоҷикӣ</option>
            </select>
          </div>
          <Button className="hidden md:inline-flex">{t.ctaConsult}</Button>
        </div>
      </div>
    </header>

    <section className="max-w-6xl mx-auto px-4 pt-14 pb-10 grid md:grid-cols-2 gap-8 items-center">
      <div>
        <h1 className="text-3xl md:text-5xl font-bold leading-tight">{t.heroTitle}</h1>
        <p className="mt-4 text-lg text-gray-700">{t.heroSubtitle}</p>
        <div className="mt-6 flex gap-3">
          <Button className="text-base">{t.ctaQuote}<ChevronRight className="w-4 h-4 ml-1"/></Button>
          <Button variant="outline" className="text-base">{t.ctaConsult}</Button>
        </div>
        <div className="mt-6 flex flex-wrap gap-3 text-sm text-gray-600">
          <span className="inline-flex items-center gap-1"><BadgeCheck className="w-4 h-4"/>{t.trustedBy}</span>
          <span className="inline-flex items-center gap-1"><ShieldCheck className="w-4 h-4"/>{t.badgeLang}</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Card className="shadow-sm"><CardContent className="p-4 flex items-center gap-3"><Package/><div><div className="font-semibold">QC</div><div className="text-sm text-gray-600">Фото/видео проверка</div></div></CardContent></Card>
        <Card className="shadow-sm"><CardContent className="p-4 flex items-center gap-3"><Boxes/><div><div className="font-semibold">Consolidation</div><div className="text-sm text-gray-600">До 30 дней бесплатно</div></div></CardContent></Card>
        <Card className="shadow-sm"><CardContent className="p-4 flex items-center gap-3"><Plane/><div><div className="font-semibold">Air</div><div className="text-sm text-gray-600">Быстрая доставка</div></div></CardContent></Card>
        <Card className="shadow-sm"><CardContent className="p-4 flex items-center gap-3"><Ship/><div><div className="font-semibold">Sea</div><div className="text-sm text-gray-600">Выгодно для объёма</div></div></CardContent></Card>
      </div>
    </section>

    <section className="bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold">{t.howTitle}</h2>
        <div className="grid md:grid-cols-4 gap-4 mt-6">{
          [
            {icon:Globe2,title:"Запрос",text:"Ссылка/описание товара"},
            {icon:Package,title:"Покупка и проверка",text:"Выкуп, QC, фото/видео"},
            {icon:Boxes,title:"Склад и консолидация",text:"Усиленная упаковка"},
            {icon:Truck,title:"Доставка",text:"Авиа/море, таможня"}
          ].map((s,i)=>(
            <Card key={i} className="shadow-sm"><CardHeader className="pb-2">
              <div className="flex items-center gap-2"><s.icon className="w-5 h-5"/><CardTitle className="text-base">{s.title}</CardTitle></div>
            </CardHeader><CardContent className="text-sm text-gray-700">{s.text}</CardContent></Card>
          ))
        }</div>
      </div>
    </section>

    <section className="py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold">{t.pricingTitle}</h2>
        <span className="text-sm text-gray-600">{t.pricingNote}</span>
        <div className="grid md:grid-cols-3 gap-4 mt-6">{
          [
            {plan:"Lite",price:"3% комиссия",features:["Покупка до ¥50,000","Фото‑подтверждение","Стандартная упаковка"]},
            {plan:"Standard",price:"5% комиссия",features:["Покупка до ¥300,000","Видео‑осмотр","Консолидация 30 дней","Приоритетная поддержка"]},
            {plan:"Pro B2B",price:"Индивидуально от 2%",features:["Аукционы/контракты","Инспекция 3rd‑party","Таможенные документы","Страхование груза"]},
          ].map((p,i)=>(
            <Card key={i} className="shadow-sm"><CardHeader><CardTitle className="text-xl">{p.plan}</CardTitle>
            <div className="text-2xl font-bold mt-1">{p.price}</div></CardHeader>
            <CardContent><ul className="space-y-2">{p.features.map((f,idx)=>(<li key={idx} className="flex items-center gap-2 text-sm"><Check className="w-4 h-4"/>{f}</li>))}</ul></CardContent></Card>
          ))
        }</div>
      </div>
    </section>

    <section className="py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2"><Calculator className="w-6 h-6"/>{t.calcTitle}</h2>
        <div className="grid md:grid-cols-6 gap-3 mt-6 items-end">
          <div className="md:col-span-2"><label className="text-sm text-gray-600">Режим</label>
            <select className="w-full border rounded-lg px-2 py-2" value={mode} onChange={e=>setMode(e.target.value)}>
              <option value="air">Авиа</option><option value="sea">Море</option>
            </select></div>
          <div className="md:col-span-2"><label className="text-sm text-gray-600">Регион</label>
            <select className="w-full border rounded-lg px-2 py-2" value={region} onChange={e=>setRegion(e.target.value)}>
              <option value="cis">СНГ</option><option value="eu">Европа</option><option value="me">Ближний Восток</option><option value="na">США/Канада</option><option value="other">Другие</option>
            </select></div>
          <div className="md:col-span-2"><label className="text-sm text-gray-600">План</label>
            <select className="w-full border rounded-lg px-2 py-2" value={plan} onChange={e=>setPlan(e.target.value)}>
              <option value="lite">Lite (3%)</option><option value="standard">Standard (5%)</option><option value="pro">Pro (от 2%)</option>
            </select></div>
          <div><label className="text-sm text-gray-600">Вес, кг</label><Input value={weight} onChange={e=>setWeight(e.target.value)}/></div>
          <div><label className="text-sm text-gray-600">Длина, см</label><Input value={l} onChange={e=>setL(e.target.value)}/></div>
          <div><label className="text-sm text-gray-600">Ширина, см</label><Input value={w} onChange={e=>setW(e.target.value)}/></div>
          <div><label className="text-sm text-gray-600">Высота, см</label><Input value={h} onChange={e=>setH(e.target.value)}/></div>
          <div className="flex items-center gap-2"><input id="ins" type="checkbox" className="w-4 h-4" checked={insure} onChange={e=>setInsure(e.target.checked)}/><label htmlFor="ins" className="text-sm text-gray-700">Страховка</label></div>
          <div><Button onClick={calcQuote} className="w-full md:w-auto">{t.calcTitle}</Button></div>
        </div>

        {result && (<div className="grid md:grid-cols-2 gap-4 mt-6">
          <Card className="shadow-sm"><CardHeader className="pb-2"><CardTitle className="text-base">Итог</CardTitle></CardHeader>
            <CardContent className="space-y-1 text-sm">
              <div className="flex justify-between"><span>Итого (JPY)</span><span className="font-semibold">{yen(result.total)}</span></div>
              <div className="flex justify-between"><span>Итого (USD≈)</span><span className="font-semibold">{usd(result.total)}</span></div>
            </CardContent></Card>
          <Card className="shadow-sm"><CardHeader className="pb-2"><CardTitle className="text-base">Детализация</CardTitle></CardHeader>
            <CardContent className="text-sm space-y-1">
              <div>Режим: {result.mode==='air'?'Авиа':'Море'} | Регион: {result.region} | План: {result.plan}</div>
              <div>Факт вес: {result.kg.toFixed(2)} кг | Объёмный: {result.volKg.toFixed(2)} кг | Chargeable: {result.chargeable.toFixed(2)} кг</div>
              <div>Ставка/кг: {yen(result.ratePerKg)} | Перевозчик: {yen(result.shippingRaw)}</div>
              <div>Упаковка/обработка: {yen(result.handling)} | Комиссия: {yen(result.serviceFee)} | Страховка: {yen(result.insurance)}</div>
            </CardContent></Card>
        </div>)}
      </div>
    </section>

    <section className="bg-gray-900 py-12 text-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold">{t.contactTitle}</h2>
        <p className="text-gray-300 mt-2">{t.contactSubtitle}</p>
        <div className="grid md:grid-cols-3 gap-4 mt-6">
          <div className="md:col-span-2 grid grid-cols-1 gap-3">
            <Input placeholder={t.formName} className="bg-white text-gray-900"/>
            <Input placeholder={t.formEmail} className="bg-white text-gray-900"/>
            <Textarea placeholder={t.formMsg} className="bg-white text-gray-900 min-h-[120px]"/>
            <Button className="w-fit">{t.formBtn}</Button>
          </div>
          <Card className="bg-white/10 border-white/20"><CardContent className="p-4 space-y-3">
            <div className="flex items-center gap-2"><Phone className="w-4 h-4"/><span>+81 •••• •• ••</span></div>
            <div className="flex items-center gap-2"><Mail className="w-4 h-4"/><span>hello@tajap.co</span></div>
            <div className="text-sm text-gray-300">Юр. лицо в Японии (KK). Реквизиты — в договоре/инвойсах.</div>
          </CardContent></Card>
        </div>
      </div>
    </section>

    <footer className="border-t">
      <div className="max-w-6xl mx-auto px-4 py-6 text-sm text-gray-600 flex items-center justify-between">
        <div>{t.footerLegal}{new Date().getFullYear()} TAJAP Co LTD. Все права защищены.</div>
        <div className="flex gap-4"><a className="hover:underline" href="#">Политика конфиденциальности</a><a className="hover:underline" href="#">Условия сервиса</a></div>
      </div>
    </footer>
  </div>);
}
