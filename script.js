const profileImages = {
    dbtkdfhr: "https://github.com/dbtkdfhr.png"
  };

  Object.values(profileImages).forEach((src) => {
    const img = new Image();
    img.src = src;
  });

  document.querySelectorAll("[data-profile-image]").forEach((img) => {
    img.src = profileImages[img.dataset.profileImage];
  });

  const profile = {
    name: "유상록",
    avatar: profileImages.dbtkdfhr,
    portfolio: "https://kosa-private-introduce.vercel.app/",
    github: "https://github.com/dbtkdfhr",
    email: "dbtkdfhr2000@naver.com"
  };

  const answers = {
    자기소개: "안녕하세요, 유상록입니다.\n복잡한 문제를 작고 선명한 인터페이스로 바꾸는 개발자입니다. 프론트엔드의 감각, 백엔드의 구조, 그리고 빠르게 실험하는 태도로 쓰기 좋은 서비스를 만드는 걸 좋아합니다.",
    기술스택: "기술 스택은 HTML, CSS, JavaScript, React, TypeScript, Java, Spring Boot, Next.js, NestJS, Kotlin, Flutter를 다뤄봤습니다.\n필요한 것만 남기고 디테일은 끝까지 챙기는 편입니다.",
    프로젝트: `대표 프로젝트는 아래 링크에서 볼 수 있습니다.
<div class="project-links">
  <a class="project-link" href="https://github.com/dbtkdfhr/FlowERD" target="_blank" rel="noreferrer">
    <strong>FlowERD</strong><span>순수 SVG 기반 ERD 다이어그램 툴 · SVG / Next.js</span>
  </a>
  <a class="project-link" href="https://github.com/schemafy/schemafy" target="_blank" rel="noreferrer">
    <strong>Schemafy</strong><span>실시간 협업 다이어그램 플랫폼 · NestJS / Monorepo</span>
  </a>
  <a class="project-link" href="https://github.com/day-23/haru-android" target="_blank" rel="noreferrer">
    <strong>Haru</strong><span>일정관리와 SNS를 결합한 모바일 앱 · Kotlin / Android SDK</span>
  </a>
  <a class="project-link" href="https://github.com/kookmin-sw/capstone-2024-19" target="_blank" rel="noreferrer">
    <strong>주문서</strong><span>법률 문제 해결 챗봇 앱 · Flutter / BLoC / ChatGPT API</span>
  </a>
</div>`,
    관심사: "관심사는 웹 인터랙션, 성능 최적화, 협업 도구, 오래 봐도 질리지 않는 UI입니다.\n요즘은 더 적은 코드로 더 똑똑하게 동작하는 제품을 만드는 쪽에 관심이 많습니다.",
    연락처: "연락은 이메일과 GitHub로 가능합니다.\nEmail: dbtkdfhr2000@naver.com\nGitHub: github.com/dbtkdfhr",
    포트폴리오: `포트폴리오는 여기에서 볼 수 있습니다.\n<a href="${profile.portfolio}" target="_blank" rel="noreferrer">PORTFLIX 열기</a>\n<a href="${profile.github}" target="_blank" rel="noreferrer">GitHub 열기</a>`
  };

  const chatBody = document.getElementById("chatBody");
  const inputField = document.getElementById("inputField");
  const sendBtn = document.getElementById("sendBtn");

  function getTime() {
    const now = new Date();
    return `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
  }

  function appendMessage(text, mine = false, html = false) {
    const row = document.createElement("div");
    row.className = `msg-row${mine ? " mine" : ""}`;

    if (!mine) {
      const avatar = document.createElement("div");
      avatar.className = "avatar";
      avatar.innerHTML = `<img alt="${profile.name}" src="${profile.avatar}">`;
      row.appendChild(avatar);
    }

    const wrap = document.createElement("div");
    wrap.className = "bubble-wrap";

    if (!mine) {
      const sender = document.createElement("div");
      sender.className = "sender-name";
      sender.textContent = profile.name;
      wrap.appendChild(sender);
    }

    const line = document.createElement("div");
    line.style.display = "flex";
    line.style.alignItems = "flex-end";
    line.style.gap = "5px";
    if (mine) {
      line.style.flexDirection = "row-reverse";
    }

    const bubble = document.createElement("div");
    bubble.className = `bubble${mine ? " mine" : ""}`;
    if (html) {
      bubble.innerHTML = text;
    } else {
      bubble.textContent = text;
    }

    const meta = document.createElement("div");
    meta.className = "bubble-meta";
    if (mine) {
      const read = document.createElement("div");
      read.className = "read-badge";
      read.textContent = "읽음";
      meta.appendChild(read);
    }
    const time = document.createElement("div");
    time.className = "msg-time";
    time.textContent = getTime();
    meta.appendChild(time);

    line.appendChild(bubble);
    line.appendChild(meta);
    wrap.appendChild(line);
    row.appendChild(wrap);
    chatBody.appendChild(row);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  function resolveAnswer(question) {
    const normalized = question.replace(/\s/g, "");
    if (normalized.includes("기술") || normalized.includes("스택")) return ["기술스택", false];
    if (normalized.includes("프로젝트") || normalized.includes("작업") || normalized.includes("깃허브") || normalized.includes("github")) return ["프로젝트", true];
    if (normalized.includes("관심") || normalized.includes("UI") || normalized.includes("성능")) return ["관심사", false];
    if (normalized.includes("연락") || normalized.includes("이메일") || normalized.includes("깃허브") || normalized.includes("github")) return ["연락처", false];
    if (normalized.includes("포트폴리오") || normalized.includes("링크") || normalized.includes("사이트")) return ["포트폴리오", true];
    return ["자기소개", false];
  }

  function ask(question) {
    appendMessage(question, true);
    inputField.value = "";
    sendBtn.classList.remove("active");

    const [key, html] = resolveAnswer(question);
    setTimeout(() => {
      appendMessage(answers[key], false, html);
    }, 450);
  }

  document.querySelectorAll(".quick-replies button").forEach((button) => {
    button.addEventListener("click", () => ask(button.dataset.question));
  });

  inputField.addEventListener("input", () => {
    sendBtn.classList.toggle("active", inputField.value.trim().length > 0);
  });

  sendBtn.addEventListener("click", () => {
    const text = inputField.value.trim();
    if (text) ask(text);
  });

  inputField.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      const text = inputField.value.trim();
      if (text) ask(text);
    }
  });

  setTimeout(() => {
    appendMessage("안녕하세요! 궁금한 걸 물어보면 제 포트폴리오 정보를 기준으로 답해드릴게요.", false);
  }, 450);
