import { profile } from "@/lib/content";

/**
 * 首屏片头：名字落版。
 *
 * 安全模型（重要，别改错）：
 * - 遮罩默认 `opacity:0 / visibility:hidden`，即"不显示"。
 * - 只有内联脚本给 <html> 加上 `data-intro="on"` 才会显示并播放。
 *   所以脚本报错 / 被拦截 / JS 关闭时，片头等于不存在，站点照常可用。
 * - 自动退场完全由 CSS animation 完成（1.75s 后 forwards 到 opacity 0），
 *   不依赖任何定时器，脚本挂了也不会挡住页面。
 * - 判断放在 <head> 之后同步执行（见 layout.tsx），服务端不参与，
 *   避免回访用户先看到遮罩再闪一下。
 */
export function IntroCurtain() {
  const { name, alias } = profile.basics;
  const chars = Array.from(name);

  return (
    <div className="intro-curtain" id="intro" aria-hidden="true">
      <div className="intro-aurora" />

      <div className="intro-inner">
        <div className="intro-name">
          {chars.map((c, i) => (
            <span
              className="intro-char"
              key={`${c}-${i}`}
              style={{ animationDelay: `${0.08 + i * 0.09}s` }}
            >
              {c}
            </span>
          ))}
        </div>

        <div className="intro-sub">
          <span className="intro-alias">{alias}</span>
          <span className="intro-dot" />
          <span className="intro-cn">2026</span>
        </div>
      </div>

      <span className="intro-skip">点击跳过</span>
      <div className="intro-bar">
        <i />
      </div>

      <script
        dangerouslySetInnerHTML={{
          __html: `(function(){
  var c=document.getElementById('intro');
  if(!c) return;
  var done=false;
  function end(){
    if(done) return; done=true;
    var o=1;
    try{ o=parseFloat(getComputedStyle(c).opacity)||0; }catch(e){}
    c.style.animation='none';
    c.style.opacity=String(o);
    c.style.pointerEvents='none';
    void c.offsetWidth;
    c.style.transition='opacity .2s linear';
    c.style.opacity='0';
    setTimeout(function(){ c.style.visibility='hidden'; },220);
  }
  c.addEventListener('click',end);
  window.addEventListener('keydown',end,{once:true});
  window.addEventListener('wheel',end,{once:true,passive:true});
  window.addEventListener('touchstart',end,{once:true,passive:true});
})();`,
        }}
      />
    </div>
  );
}
