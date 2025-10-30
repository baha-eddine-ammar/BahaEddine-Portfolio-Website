document.addEventListener('DOMContentLoaded',()=>{
  // Background canvas
  const canvas=document.createElement('canvas');
  canvas.className='bg-canvas';
  canvas.id='bg-canvas';
  document.body.prepend(canvas);
  const ctx=canvas.getContext('2d');
  let width,height,particles=[]; const COUNT=40;
  function resize(){width=canvas.width=window.innerWidth;height=canvas.height=window.innerHeight}
  function rand(min,max){return Math.random()*(max-min)+min}
  function init(){particles=new Array(COUNT).fill(0).map(()=>({
    x:rand(0,width),y:rand(0,height),r:rand(30,90),
    vx:rand(-0.3,0.3),vy:rand(-0.3,0.3),
    hue:rand(190,260)
  }))}
  function step(){
    ctx.clearRect(0,0,width,height);
    for(const p of particles){
      p.x+=p.vx; p.y+=p.vy;
      if(p.x<-p.r) p.x=width+p.r; if(p.x>width+p.r) p.x=-p.r;
      if(p.y<-p.r) p.y=height+p.r; if(p.y>height+p.r) p.y=-p.r;
      const g=ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.r);
      g.addColorStop(0,`hsla(${p.hue},80%,60%,.35)`);
      g.addColorStop(1,'hsla(0,0%,0%,0)');
      ctx.fillStyle=g; ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fill();
    }
    req=requestAnimationFrame(step);
  }
  let req; resize(); init(); step();
  window.addEventListener('resize',()=>{resize(); init();});

  const yearEl=document.getElementById('year');
  if(yearEl){yearEl.textContent=new Date().getFullYear();}

  const toggle=document.querySelector('.nav-toggle');
  const links=document.querySelector('.nav-links');
  if(toggle && links){
    toggle.addEventListener('click',()=>{
      links.classList.toggle('open');
    });
  }

  // Scroll reveal
  const observer=new IntersectionObserver((entries)=>{
    for(const e of entries){
      if(e.isIntersecting){
        e.target.classList.add('in');
        observer.unobserve(e.target);
      }
    }
  },{threshold:0.12});
  document.querySelectorAll('.sr').forEach(el=>observer.observe(el));

  // Mark active link by pathname
  const path=location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav a').forEach(a=>{
    const href=a.getAttribute('href');
    if(href && href.endsWith(path)){
      a.classList.add('active');
    }
  });

  // Email link fallback: if mailto is blocked, open Gmail compose
  const emailLinks=document.querySelectorAll('.email-link[data-email]');
  emailLinks.forEach(link=>{
    link.addEventListener('click',()=>{
      const to=encodeURIComponent(link.getAttribute('data-email')||'');
      const gmail=`https://mail.google.com/mail/?view=cm&to=${to}`;
      setTimeout(()=>{
        // If nothing happened (common on some setups), provide a web fallback
        window.open(gmail,'_blank');
      },800);
    });
  });

  // Scroll progress + back to top
  const progress=document.createElement('div'); progress.className='progress'; document.body.appendChild(progress);
  const back=document.createElement('button'); back.className='back-top'; back.textContent='↑'; document.body.appendChild(back);
  back.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
  function onScroll(){
    const h=document.documentElement;
    const scrolled=(h.scrollTop)/(h.scrollHeight-h.clientHeight);
    progress.style.width=(scrolled*100)+'%';
    if(h.scrollTop>400){back.classList.add('show')}else{back.classList.remove('show')}
  }
  document.addEventListener('scroll',onScroll,{passive:true}); onScroll();

  // Tilt effects
  const tilts=[...document.querySelectorAll('.card'), ...document.querySelectorAll('.photo-wrap')];
  tilts.forEach(el=>{
    el.classList.add('tilt-shadow');
    const strength=10;
    function move(e){
      const rect=el.getBoundingClientRect();
      const cx=rect.left+rect.width/2; const cy=rect.top+rect.height/2;
      const dx=(e.clientX-cx)/rect.width; const dy=(e.clientY-cy)/rect.height;
      el.style.transform=`rotateX(${(-dy*strength)}deg) rotateY(${(dx*strength)}deg)`;
      el.classList.add('is-tilting');
    }
    function leave(){el.style.transform=''; el.classList.remove('is-tilting');}
    el.addEventListener('mousemove',move); el.addEventListener('mouseleave',leave);
  });
});


