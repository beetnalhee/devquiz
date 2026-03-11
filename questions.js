const QUESTIONS = [
  // ===== Go =====
  {
    id: 1,
    category: "Go",
    question: "Go 언어에서 슬라이스(slice)에 대한 설명으로 옳은 것은?",
    options: [
      "슬라이스는 고정 길이 배열이다",
      "슬라이스는 내부적으로 포인터, 길이, 용량 정보를 가진다",
      "슬라이스는 항상 새로운 메모리를 할당한다",
      "슬라이스는 배열을 참조할 수 없다",
    ],
    answer: 1,
    explanation:
      "Go의 슬라이스는 내부적으로 underlying array에 대한 포인터(pointer), 현재 길이(length), 용량(capacity) 세 가지 필드를 가진 구조체입니다. 배열과 달리 동적으로 크기가 변할 수 있으며, append() 시 용량이 부족하면 새로운 배열을 할당합니다.",
  },
  {
    id: 2,
    category: "Go",
    question: "Go에서 goroutine과 OS 스레드의 차이점은?",
    options: [
      "goroutine은 OS 스레드와 동일하다",
      "goroutine은 OS 스레드보다 무겁다",
      "goroutine은 Go 런타임이 관리하는 경량 스레드로, 스택 크기가 작고 M:N 스케줄링된다",
      "goroutine은 동시에 최대 하나만 실행될 수 있다",
    ],
    answer: 2,
    explanation:
      "goroutine은 Go 런타임의 스케줄러가 관리하는 경량 스레드입니다. 초기 스택 크기가 약 2KB(OS 스레드는 보통 1MB)로 매우 작고, M:N 스케줄링(M개의 goroutine을 N개의 OS 스레드에 매핑)을 사용합니다. 수십만 개의 goroutine도 효율적으로 실행할 수 있습니다.",
  },
  {
    id: 3,
    category: "Go",
    question: "Go에서 defer 키워드의 실행 순서는?",
    options: [
      "선언 순서대로 실행된다 (FIFO)",
      "역순으로 실행된다 (LIFO, 스택)",
      "병렬로 동시에 실행된다",
      "실행 순서가 보장되지 않는다",
    ],
    answer: 1,
    explanation:
      "defer는 함수가 종료될 때 실행되며, 여러 defer가 있으면 LIFO(Last In, First Out) 순서로 실행됩니다. 스택처럼 나중에 등록된 것이 먼저 실행됩니다. 리소스 해제 순서를 보장하는 데 유용합니다.",
  },
  {
    id: 4,
    category: "Go",
    question: "Go에서 interface{}(빈 인터페이스)에 대한 설명으로 올바른 것은?",
    options: [
      "interface{}는 int 타입만 받을 수 있다",
      "interface{}는 모든 타입을 만족시키는 타입이다",
      "interface{}를 사용하면 컴파일 에러가 발생한다",
      "interface{}는 Go 1.18 이후 삭제되었다",
    ],
    answer: 1,
    explanation:
      "빈 인터페이스 interface{}(Go 1.18+에서는 any)는 메서드 요구사항이 없으므로 모든 타입이 이를 만족합니다. Java의 Object, TypeScript의 any와 유사하지만, 사용 시 타입 단언(type assertion)이 필요하므로 남용은 피해야 합니다.",
  },
  {
    id: 5,
    category: "Go",
    question: "Go에서 channel의 주요 용도는?",
    options: [
      "파일 I/O 처리",
      "goroutine 간의 통신과 동기화",
      "메모리 할당 최적화",
      "HTTP 요청 처리",
    ],
    answer: 1,
    explanation:
      "Go의 channel은 goroutine 간에 데이터를 안전하게 주고받는 통신 메커니즘입니다. 'Do not communicate by sharing memory; instead, share memory by communicating'이라는 Go의 철학을 구현합니다. 버퍼드/언버퍼드 채널로 동기화 패턴을 구현할 수 있습니다.",
  },
  {
    id: 6,
    category: "Go",
    question: "Go에서 error 처리의 관용적(idiomatic) 패턴은?",
    options: [
      "try-catch 블록을 사용한다",
      "if err != nil 패턴으로 명시적으로 처리한다",
      "에러를 무시하고 panic을 사용한다",
      "글로벌 에러 핸들러를 등록한다",
    ],
    answer: 1,
    explanation:
      "Go는 예외(exception) 대신 에러 값을 반환하는 방식을 사용합니다. 함수가 (result, error) 튜플을 반환하고, 호출자가 if err != nil로 즉시 처리합니다. 이 명시적 패턴이 Go의 핵심 철학이며, panic은 복구 불가능한 상황에서만 사용합니다.",
  },
  {
    id: 7,
    category: "Go",
    question: "Go의 map에 대한 설명으로 올바른 것은?",
    options: [
      "map은 동시성 안전(concurrent-safe)하다",
      "map은 순서가 보장된다",
      "map은 참조 타입으로, nil map에 쓰기 시 panic이 발생한다",
      "map의 키로 slice를 사용할 수 있다",
    ],
    answer: 2,
    explanation:
      "Go의 map은 참조 타입이며, nil map에서 읽기는 가능하지만 쓰기 시 panic이 발생합니다. 순서가 보장되지 않고, 동시성 안전하지 않아 concurrent access 시 sync.Mutex나 sync.Map을 사용해야 합니다. 키는 comparable 타입만 가능하므로 slice는 키로 사용할 수 없습니다.",
  },
  {
    id: 8,
    category: "Go",
    question: "Go 모듈(module)에서 go.sum 파일의 역할은?",
    options: [
      "의존성 버전만 기록한다",
      "의존성의 체크섬(해시)을 저장하여 무결성을 검증한다",
      "빌드 캐시를 저장한다",
      "컴파일된 바이너리를 저장한다",
    ],
    answer: 1,
    explanation:
      "go.sum은 각 의존성 모듈의 암호화 해시(checksum)를 저장합니다. 이를 통해 의존성이 변조되지 않았는지 무결성을 검증합니다. go.mod가 의존성 버전을 선언하고, go.sum이 해당 버전의 정확한 내용을 보장하는 역할을 합니다.",
  },
  // ===== JavaScript =====
  {
    id: 9,
    category: "JavaScript",
    question: "JavaScript에서 == 와 === 의 차이점은?",
    options: [
      "차이가 없다",
      "==는 값만 비교하고, ===는 값과 타입 모두 비교한다",
      "===는 값만 비교하고, ==는 값과 타입 모두 비교한다",
      "==는 객체 비교용이고, ===는 원시값 비교용이다",
    ],
    answer: 1,
    explanation:
      '==(동등 연산자)는 타입 변환(type coercion)을 수행한 후 값을 비교합니다. ===(일치 연산자)는 타입 변환 없이 값과 타입 모두 비교합니다. 예: 1 == "1"은 true, 1 === "1"은 false. 대부분의 경우 ===를 사용하는 것이 권장됩니다.',
  },
  {
    id: 10,
    category: "JavaScript",
    question: "JavaScript의 이벤트 루프(Event Loop)에 대한 설명으로 올바른 것은?",
    options: [
      "이벤트 루프는 멀티스레드로 동작한다",
      "콜 스택이 비어있을 때 태스크 큐에서 콜백을 가져와 실행한다",
      "Promise는 태스크 큐(매크로태스크)에서 처리된다",
      "setTimeout(fn, 0)은 즉시 실행된다",
    ],
    answer: 1,
    explanation:
      "이벤트 루프는 콜 스택이 비어있는지 확인하고, 비어있으면 마이크로태스크 큐(Promise 등) → 매크로태스크 큐(setTimeout 등) 순서로 콜백을 가져와 실행합니다. JavaScript는 싱글스레드이며, setTimeout(fn, 0)도 현재 콜 스택이 비워진 후에 실행됩니다.",
  },
  {
    id: 11,
    category: "JavaScript",
    question: "JavaScript에서 클로저(Closure)란?",
    options: [
      "함수를 즉시 실행하는 패턴이다",
      "함수가 자신이 선언된 렉시컬 스코프를 기억하고 접근할 수 있는 것이다",
      "객체를 깊은 복사하는 방법이다",
      "비동기 코드를 동기적으로 실행하는 기법이다",
    ],
    answer: 1,
    explanation:
      "클로저는 함수가 자신이 생성된 렉시컬 환경(변수 스코프)을 기억하여, 함수가 스코프 밖에서 실행되더라도 해당 변수에 접근할 수 있는 것을 말합니다. 데이터 은닉, 모듈 패턴, 커링 등에 활용됩니다.",
  },
  {
    id: 12,
    category: "JavaScript",
    question: "JavaScript의 this 바인딩에 대한 설명으로 올바른 것은?",
    options: [
      "this는 항상 전역 객체를 가리킨다",
      "화살표 함수는 자신만의 this를 가진다",
      "this는 함수가 호출되는 방식에 따라 결정된다",
      "strict mode에서 this는 항상 undefined이다",
    ],
    answer: 2,
    explanation:
      "JavaScript의 this는 함수의 호출 방식에 따라 동적으로 결정됩니다. 메서드 호출 시 해당 객체, new 호출 시 새 인스턴스, call/apply/bind로 명시 지정, 화살표 함수는 상위 스코프의 this를 상속합니다. 이 동적 바인딩이 많은 혼란의 원인입니다.",
  },
  {
    id: 13,
    category: "JavaScript",
    question: "Promise.all()과 Promise.allSettled()의 차이는?",
    options: [
      "둘 다 동일하게 동작한다",
      "Promise.all()은 하나라도 reject되면 즉시 reject, allSettled()는 모든 결과를 반환한다",
      "Promise.allSettled()이 더 빠르다",
      "Promise.all()은 순차 실행, allSettled()는 병렬 실행한다",
    ],
    answer: 1,
    explanation:
      "Promise.all()은 모든 Promise가 성공해야 하며, 하나라도 reject되면 전체가 reject됩니다. Promise.allSettled()는 성공/실패 여부와 관계없이 모든 Promise가 완료될 때까지 기다린 후, 각각의 상태(fulfilled/rejected)와 값을 반환합니다.",
  },
  {
    id: 14,
    category: "JavaScript",
    question: "var, let, const의 차이점으로 올바른 것은?",
    options: [
      "세 가지 모두 블록 스코프를 가진다",
      "var는 함수 스코프, let과 const는 블록 스코프를 가진다",
      "const로 선언한 객체의 속성은 변경할 수 없다",
      "let은 재선언이 가능하다",
    ],
    answer: 1,
    explanation:
      "var는 함수 스코프를 가지며 호이스팅됩니다. let과 const는 블록 스코프를 가지며 TDZ(Temporal Dead Zone)가 적용됩니다. const는 재할당만 불가능하고, 객체의 속성 변경은 가능합니다. 현대 JS에서는 const를 기본으로, 재할당이 필요한 경우만 let을 사용합니다.",
  },
  {
    id: 15,
    category: "JavaScript",
    question: "JavaScript에서 깊은 복사(Deep Copy)를 하는 방법은?",
    options: [
      "Object.assign()을 사용한다",
      "스프레드 연산자(...)를 사용한다",
      "structuredClone()을 사용한다",
      "= 연산자로 복사한다",
    ],
    answer: 2,
    explanation:
      "Object.assign()과 스프레드 연산자는 얕은 복사(shallow copy)만 수행합니다. structuredClone()은 브라우저와 Node.js에서 지원하는 네이티브 깊은 복사 API입니다. JSON.parse(JSON.stringify())도 가능하지만 함수, Date, undefined 등을 처리하지 못합니다.",
  },
  // ===== TypeScript =====
  {
    id: 16,
    category: "TypeScript",
    question: "TypeScript에서 interface와 type의 차이점은?",
    options: [
      "type은 객체 타입을 정의할 수 없다",
      "interface는 extends로 확장 가능하고, type은 유니온/인터섹션 타입을 지원한다",
      "interface와 type은 완전히 동일하다",
      "type은 함수 타입을 정의할 수 없다",
    ],
    answer: 1,
    explanation:
      "interface는 선언 병합(declaration merging)과 extends를 통한 확장이 가능합니다. type은 유니온(|), 인터섹션(&), 매핑된 타입 등 더 다양한 타입 조합을 지원합니다. 객체 형태는 interface, 복잡한 타입 조합은 type을 사용하는 것이 일반적인 컨벤션입니다.",
  },
  {
    id: 17,
    category: "TypeScript",
    question: "TypeScript의 제네릭(Generic)의 주요 목적은?",
    options: [
      "코드 실행 속도를 높이기 위해",
      "타입 안전성을 유지하면서 재사용 가능한 코드를 작성하기 위해",
      "JavaScript로 컴파일 시 타입 정보를 보존하기 위해",
      "런타임에 타입을 검사하기 위해",
    ],
    answer: 1,
    explanation:
      "제네릭은 타입을 파라미터로 받아 다양한 타입에 대해 동작하면서도 타입 안전성을 유지합니다. 예: function identity<T>(arg: T): T는 어떤 타입이든 받으면서 반환 타입도 보장합니다. 컬렉션, 유틸리티 함수, API 응답 타입 등에 필수적입니다.",
  },
  {
    id: 18,
    category: "TypeScript",
    question: "TypeScript에서 unknown과 any의 차이는?",
    options: [
      "차이가 없다",
      "unknown은 타입 검사 없이 사용할 수 있다",
      "unknown은 사용 전 타입을 좁혀야(narrowing) 하고, any는 타입 검사를 건너뛴다",
      "any가 unknown보다 더 안전하다",
    ],
    answer: 2,
    explanation:
      "any는 모든 타입 검사를 우회하여 타입 안전성을 포기합니다. unknown은 모든 타입의 값을 할당받을 수 있지만, 사용하려면 typeof, instanceof 등으로 타입을 좁혀야 합니다. 외부 데이터 처리 시 any 대신 unknown을 사용하는 것이 권장됩니다.",
  },
  {
    id: 19,
    category: "TypeScript",
    question: "TypeScript의 유틸리티 타입 중 Partial<T>의 역할은?",
    options: [
      "T의 모든 속성을 필수로 만든다",
      "T의 모든 속성을 선택적(optional)으로 만든다",
      "T에서 특정 속성만 선택한다",
      "T의 모든 속성을 읽기 전용으로 만든다",
    ],
    answer: 1,
    explanation:
      "Partial<T>는 T의 모든 속성에 ?를 붙여 선택적으로 만듭니다. 업데이트 함수에서 일부 필드만 변경할 때 유용합니다. 반대로 Required<T>는 모든 속성을 필수로 만들고, Pick<T, K>는 특정 속성만 선택, Readonly<T>는 읽기 전용으로 만듭니다.",
  },
  // ===== React =====
  {
    id: 20,
    category: "React",
    question: "React에서 useEffect의 cleanup 함수가 실행되는 시점은?",
    options: [
      "컴포넌트가 처음 마운트될 때만",
      "컴포넌트가 언마운트될 때, 그리고 다음 effect 실행 전",
      "state가 변경될 때만",
      "부모 컴포넌트가 리렌더링될 때만",
    ],
    answer: 1,
    explanation:
      "useEffect의 cleanup 함수는 두 가지 시점에 실행됩니다: (1) 컴포넌트가 언마운트될 때, (2) 의존성 배열의 값이 변경되어 다음 effect가 실행되기 직전. 이를 통해 이전 effect의 부수 효과(구독, 타이머 등)를 정리할 수 있습니다.",
  },
  {
    id: 21,
    category: "React",
    question: "React에서 key prop이 중요한 이유는?",
    options: [
      "CSS 스타일링에 사용된다",
      "접근성(a11y)을 위해 필요하다",
      "React가 리스트 항목의 변경, 추가, 삭제를 효율적으로 추적하기 위해 필요하다",
      "서버 사이드 렌더링에만 필요하다",
    ],
    answer: 2,
    explanation:
      "key는 React의 재조정(reconciliation) 알고리즘이 리스트에서 어떤 항목이 변경/추가/삭제되었는지 식별하는 데 사용됩니다. 고유한 key가 없으면 불필요한 리렌더링이 발생하고, 인덱스를 key로 사용하면 항목 순서 변경 시 버그가 발생할 수 있습니다.",
  },
  {
    id: 22,
    category: "React",
    question: "React의 useState에서 상태 업데이트가 비동기적인 이유는?",
    options: [
      "JavaScript 자체가 비동기이기 때문이다",
      "React가 성능 최적화를 위해 상태 업데이트를 배치(batch) 처리하기 때문이다",
      "서버에서 상태를 가져오기 때문이다",
      "브라우저 API의 제한 때문이다",
    ],
    answer: 1,
    explanation:
      "React는 여러 setState 호출을 하나의 리렌더링으로 묶는 배치(batching) 처리를 합니다. React 18부터는 이벤트 핸들러, setTimeout, Promise 등 모든 곳에서 자동 배칭됩니다. 이전 상태 기반 업데이트가 필요하면 함수형 업데이트: setState(prev => prev + 1)를 사용합니다.",
  },
  {
    id: 23,
    category: "React",
    question: "React에서 useMemo와 useCallback의 차이는?",
    options: [
      "차이가 없다",
      "useMemo는 값을 메모이제이션하고, useCallback은 함수를 메모이제이션한다",
      "useMemo는 비동기용이고, useCallback은 동기용이다",
      "useMemo는 클래스 컴포넌트용이다",
    ],
    answer: 1,
    explanation:
      "useMemo는 계산 비용이 큰 값을 캐싱하여 불필요한 재계산을 방지합니다. useCallback은 함수 인스턴스를 캐싱하여 자식 컴포넌트의 불필요한 리렌더링을 방지합니다. 둘 다 의존성 배열이 변경될 때만 재계산/재생성됩니다. 과도한 사용은 오히려 성능에 해로울 수 있습니다.",
  },
  {
    id: 24,
    category: "React",
    question: "React Server Components(RSC)의 핵심 장점은?",
    options: [
      "클라이언트에서 더 빠르게 렌더링된다",
      "서버에서 렌더링되어 JS 번들 크기를 줄이고, 직접 데이터 접근이 가능하다",
      "SEO에만 유리하다",
      "상태 관리가 더 쉬워진다",
    ],
    answer: 1,
    explanation:
      "Server Components는 서버에서 렌더링되어 HTML을 스트리밍하므로 클라이언트 JS 번들에 포함되지 않습니다. DB, 파일 시스템에 직접 접근 가능하고, 대형 라이브러리를 서버에서만 사용할 수 있습니다. 단, useState 등 인터랙티브 기능은 Client Components에서만 가능합니다.",
  },
  // ===== HTTP / REST API =====
  {
    id: 25,
    category: "HTTP",
    question: "HTTP 상태 코드 중 클라이언트 요청이 잘못되었을 때 가장 일반적으로 사용하는 코드는?",
    options: ["200", "301", "400", "500"],
    answer: 2,
    explanation:
      "400 Bad Request는 클라이언트의 요청이 잘못되었음을 나타냅니다. 200은 성공, 301은 영구 리다이렉트, 500은 서버 내부 오류입니다. 클라이언트 에러는 4xx 범위(400~499)에 해당합니다.",
  },
  {
    id: 26,
    category: "REST API",
    question: "REST API 설계에서 리소스 생성(Create)에 가장 적절한 HTTP 메서드는?",
    options: ["GET", "POST", "PUT", "DELETE"],
    answer: 1,
    explanation:
      "POST는 새로운 리소스를 생성할 때 사용합니다. GET은 조회, PUT은 전체 수정(또는 생성), DELETE는 삭제에 사용합니다. CRUD와 HTTP 메서드 매핑: Create→POST, Read→GET, Update→PUT/PATCH, Delete→DELETE.",
  },
  {
    id: 27,
    category: "HTTP",
    question: "HTTP/2의 주요 개선 사항은?",
    options: [
      "요청/응답이 텍스트 기반이다",
      "멀티플렉싱으로 하나의 연결에서 여러 요청을 동시에 처리할 수 있다",
      "쿠키를 사용하지 않는다",
      "HTTPS를 필수로 요구하지 않는다",
    ],
    answer: 1,
    explanation:
      "HTTP/2는 바이너리 프레이밍, 멀티플렉싱(하나의 TCP 연결에서 여러 요청/응답 동시 처리), 헤더 압축(HPACK), 서버 푸시 등을 지원합니다. HTTP/1.1의 Head-of-Line Blocking 문제를 해결하여 웹 성능이 크게 향상됩니다.",
  },
  {
    id: 28,
    category: "HTTP",
    question: "CORS(Cross-Origin Resource Sharing)에 대한 설명으로 올바른 것은?",
    options: [
      "CORS는 서버 간 통신을 위한 프로토콜이다",
      "브라우저가 다른 출처(origin)의 리소스 요청을 제한하고, 서버가 허용 여부를 결정하는 메커니즘이다",
      "CORS는 HTTPS에서만 동작한다",
      "CORS 설정은 클라이언트에서만 한다",
    ],
    answer: 1,
    explanation:
      "CORS는 브라우저의 동일 출처 정책(Same-Origin Policy)을 완화하는 메커니즘입니다. 서버가 Access-Control-Allow-Origin 등의 헤더로 허용할 출처를 지정합니다. Preflight(OPTIONS) 요청으로 사전 확인 후 실제 요청을 보냅니다. 서버 측 설정이 핵심입니다.",
  },
  {
    id: 29,
    category: "REST API",
    question: "REST API에서 PUT과 PATCH의 차이는?",
    options: [
      "PUT은 생성, PATCH는 삭제에 사용한다",
      "PUT은 리소스 전체를 교체하고, PATCH는 일부만 수정한다",
      "PATCH가 PUT보다 항상 빠르다",
      "둘 다 동일하게 동작한다",
    ],
    answer: 1,
    explanation:
      "PUT은 리소스 전체를 새로운 데이터로 교체(replace)합니다. 보내지 않은 필드는 기본값이나 null이 됩니다. PATCH는 리소스의 일부 필드만 수정(partial update)합니다. 예: 사용자 이름만 변경할 때는 PATCH가 적절합니다.",
  },
  {
    id: 30,
    category: "REST API",
    question: "REST API에서 멱등성(Idempotency)을 가지는 HTTP 메서드는?",
    options: [
      "POST만",
      "GET, PUT, DELETE",
      "GET만",
      "모든 HTTP 메서드",
    ],
    answer: 1,
    explanation:
      "멱등성은 같은 요청을 여러 번 보내도 결과가 동일한 성질입니다. GET(조회), PUT(전체 교체), DELETE(삭제)는 멱등합니다. POST는 호출할 때마다 새 리소스를 생성할 수 있으므로 멱등하지 않습니다. PATCH는 구현에 따라 다릅니다.",
  },
  // ===== 데이터베이스 =====
  {
    id: 31,
    category: "데이터베이스",
    question: "데이터베이스에서 ACID 중 Consistency의 의미는?",
    options: [
      "트랜잭션은 전부 실행되거나 전혀 실행되지 않는다",
      "트랜잭션 실행 후 데이터베이스는 항상 유효한 상태를 유지한다",
      "동시에 실행되는 트랜잭션은 서로 영향을 주지 않는다",
      "커밋된 데이터는 시스템 장애 후에도 유지된다",
    ],
    answer: 1,
    explanation:
      "Consistency(일관성)는 트랜잭션 전후로 데이터베이스가 항상 유효한 상태를 유지해야 함을 의미합니다. A는 Atomicity(원자성), C는 Isolation(격리성), D는 Durability(지속성)에 대한 설명입니다.",
  },
  {
    id: 32,
    category: "데이터베이스",
    question: "데이터베이스 인덱스(Index)에 대한 설명으로 올바른 것은?",
    options: [
      "인덱스를 많이 만들수록 항상 성능이 좋아진다",
      "인덱스는 SELECT 성능을 높이지만 INSERT/UPDATE 성능에는 오버헤드가 있다",
      "인덱스는 디스크 공간을 사용하지 않는다",
      "Primary Key에는 자동으로 인덱스가 생성되지 않는다",
    ],
    answer: 1,
    explanation:
      "인덱스는 B-Tree 등의 자료구조로 검색 속도를 높이지만, 데이터 변경(INSERT/UPDATE/DELETE) 시 인덱스도 함께 갱신해야 하므로 쓰기 성능에 오버헤드가 발생합니다. 또한 추가 디스크 공간을 사용합니다. 적절한 컬럼에만 인덱스를 생성하는 것이 중요합니다.",
  },
  {
    id: 33,
    category: "데이터베이스",
    question: "SQL에서 JOIN의 종류 중 INNER JOIN의 동작은?",
    options: [
      "왼쪽 테이블의 모든 행을 반환한다",
      "두 테이블에서 조건이 일치하는 행만 반환한다",
      "오른쪽 테이블의 모든 행을 반환한다",
      "두 테이블의 모든 행을 반환한다",
    ],
    answer: 1,
    explanation:
      "INNER JOIN은 두 테이블에서 조인 조건이 일치하는 행만 반환합니다. LEFT JOIN은 왼쪽 테이블 전체 + 일치하는 오른쪽 행, RIGHT JOIN은 그 반대, FULL OUTER JOIN은 양쪽 모든 행을 반환합니다. INNER JOIN이 가장 일반적으로 사용됩니다.",
  },
  {
    id: 34,
    category: "데이터베이스",
    question: "데이터베이스 정규화(Normalization)의 주요 목적은?",
    options: [
      "쿼리 속도를 높이기 위해",
      "데이터 중복을 최소화하고 무결성을 보장하기 위해",
      "테이블 수를 줄이기 위해",
      "인덱스를 자동 생성하기 위해",
    ],
    answer: 1,
    explanation:
      "정규화는 데이터 중복을 제거하고 데이터 무결성을 유지하기 위한 설계 기법입니다. 1NF(원자값), 2NF(부분 종속 제거), 3NF(이행 종속 제거) 등의 단계가 있습니다. 단, 과도한 정규화는 JOIN 증가로 성능이 저하될 수 있어 비정규화도 고려합니다.",
  },
  {
    id: 35,
    category: "데이터베이스",
    question: "N+1 쿼리 문제란?",
    options: [
      "N개의 테이블을 1번만 조회하는 것",
      "1번의 쿼리로 N개의 목록을 가져온 후, 각 항목에 대해 N번의 추가 쿼리가 발생하는 것",
      "N개의 인덱스를 1개로 합치는 것",
      "쿼리 결과가 N+1행인 것",
    ],
    answer: 1,
    explanation:
      "N+1 문제는 ORM에서 자주 발생합니다. 예: 게시글 10개를 가져온 후(1회), 각 게시글의 작성자를 개별 조회(10회)하면 총 11회 쿼리가 실행됩니다. JOIN, Eager Loading, DataLoader 등으로 해결할 수 있습니다.",
  },
  {
    id: 36,
    category: "데이터베이스",
    question: "NoSQL과 RDBMS를 비교한 설명으로 올바른 것은?",
    options: [
      "NoSQL은 항상 RDBMS보다 빠르다",
      "NoSQL은 스키마가 유연하고 수평 확장에 유리하며, RDBMS는 트랜잭션과 데이터 일관성에 강하다",
      "RDBMS는 수평 확장이 불가능하다",
      "NoSQL은 데이터 일관성을 항상 보장한다",
    ],
    answer: 1,
    explanation:
      "RDBMS는 스키마 기반으로 ACID 트랜잭션과 강한 일관성을 보장합니다. NoSQL(MongoDB, Redis, Cassandra 등)은 유연한 스키마, 수평 확장(sharding), 높은 처리량이 장점이지만, 보통 최종 일관성(eventual consistency)을 채택합니다. 용도에 따라 선택합니다.",
  },
  // ===== 알고리즘 / 자료구조 =====
  {
    id: 37,
    category: "알고리즘",
    question: "다음 중 시간 복잡도 O(log n)을 가지는 알고리즘은?",
    options: [
      "선형 탐색 (Linear Search)",
      "이진 탐색 (Binary Search)",
      "버블 정렬 (Bubble Sort)",
      "삽입 정렬 (Insertion Sort)",
    ],
    answer: 1,
    explanation:
      "이진 탐색은 정렬된 배열에서 중간값과 비교하여 탐색 범위를 절반씩 줄여나가므로 O(log n)입니다. 선형 탐색은 O(n), 버블 정렬과 삽입 정렬은 O(n²)입니다.",
  },
  {
    id: 38,
    category: "자료구조",
    question: "해시 테이블(Hash Table)의 평균 시간 복잡도로 올바른 것은?",
    options: [
      "검색: O(n), 삽입: O(n)",
      "검색: O(1), 삽입: O(1)",
      "검색: O(log n), 삽입: O(log n)",
      "검색: O(1), 삽입: O(n)",
    ],
    answer: 1,
    explanation:
      "해시 테이블은 키를 해시 함수로 변환하여 인덱스에 직접 접근하므로 평균적으로 O(1)의 검색/삽입 성능을 가집니다. 다만 해시 충돌이 많으면 최악의 경우 O(n)이 될 수 있습니다. 좋은 해시 함수와 적절한 로드 팩터 관리가 중요합니다.",
  },
  {
    id: 39,
    category: "알고리즘",
    question: "다음 정렬 알고리즘 중 평균 시간 복잡도가 O(n log n)이 아닌 것은?",
    options: [
      "퀵 정렬 (Quick Sort)",
      "병합 정렬 (Merge Sort)",
      "선택 정렬 (Selection Sort)",
      "힙 정렬 (Heap Sort)",
    ],
    answer: 2,
    explanation:
      "선택 정렬은 항상 O(n²)입니다. 퀵 정렬(평균 O(n log n), 최악 O(n²)), 병합 정렬(항상 O(n log n)), 힙 정렬(항상 O(n log n))입니다. 실무에서는 대부분의 언어 표준 라이브러리가 퀵 정렬의 변형(Introsort)을 사용합니다.",
  },
  {
    id: 40,
    category: "자료구조",
    question: "스택(Stack)과 큐(Queue)의 차이는?",
    options: [
      "스택은 FIFO, 큐는 LIFO",
      "스택은 LIFO, 큐는 FIFO",
      "둘 다 FIFO",
      "둘 다 LIFO",
    ],
    answer: 1,
    explanation:
      "스택은 LIFO(Last In, First Out)로 나중에 넣은 것이 먼저 나옵니다 (예: 함수 호출 스택, Undo). 큐는 FIFO(First In, First Out)로 먼저 넣은 것이 먼저 나옵니다 (예: 작업 대기열, BFS). 이 개념은 면접에서 매우 자주 출제됩니다.",
  },
  {
    id: 41,
    category: "자료구조",
    question: "이진 탐색 트리(BST)에서 검색 시간 복잡도는?",
    options: [
      "항상 O(1)",
      "평균 O(log n), 최악 O(n)",
      "항상 O(log n)",
      "항상 O(n)",
    ],
    answer: 1,
    explanation:
      "균형 잡힌 BST에서는 O(log n)이지만, 편향된 트리(한쪽으로 치우친)에서는 연결 리스트와 같아져 O(n)이 됩니다. 이를 해결하기 위해 AVL 트리, Red-Black 트리 등 자가 균형 트리를 사용합니다.",
  },
  {
    id: 42,
    category: "알고리즘",
    question: "동적 프로그래밍(Dynamic Programming)의 핵심 조건은?",
    options: [
      "문제가 정렬되어 있어야 한다",
      "최적 부분 구조와 중복되는 부분 문제를 가져야 한다",
      "재귀를 사용하지 않아야 한다",
      "시간 복잡도가 O(n)이어야 한다",
    ],
    answer: 1,
    explanation:
      "DP는 두 가지 조건이 필요합니다: (1) 최적 부분 구조(큰 문제의 최적해가 작은 문제의 최적해로 구성), (2) 중복되는 부분 문제(같은 부분 문제가 반복 등장). 메모이제이션(Top-down)이나 타뷸레이션(Bottom-up)으로 중복 계산을 피합니다.",
  },
  {
    id: 43,
    category: "알고리즘",
    question: "그래프 탐색에서 BFS와 DFS의 차이는?",
    options: [
      "BFS는 스택, DFS는 큐를 사용한다",
      "BFS는 큐를 사용해 너비 우선, DFS는 스택(또는 재귀)을 사용해 깊이 우선 탐색한다",
      "BFS가 항상 DFS보다 빠르다",
      "둘 다 동일한 순서로 탐색한다",
    ],
    answer: 1,
    explanation:
      "BFS(너비 우선)는 큐를 사용하여 가까운 노드부터 탐색하며, 최단 경로를 찾는 데 유리합니다. DFS(깊이 우선)는 스택이나 재귀를 사용하여 한 경로를 끝까지 탐색합니다. 그래프 문제의 성격에 따라 적절한 방법을 선택합니다.",
  },
  // ===== Git =====
  {
    id: 44,
    category: "Git",
    question: "git rebase와 git merge의 차이점으로 올바른 것은?",
    options: [
      "rebase는 새로운 merge commit을 생성한다",
      "rebase는 커밋 히스토리를 선형으로 재정렬한다",
      "merge는 기존 커밋을 삭제한다",
      "rebase와 merge는 결과가 항상 동일하다",
    ],
    answer: 1,
    explanation:
      "git rebase는 현재 브랜치의 커밋들을 대상 브랜치 위로 재배치하여 선형적인 히스토리를 만듭니다. 반면 merge는 두 브랜치를 합치는 새로운 merge commit을 생성합니다. rebase는 깔끔한 히스토리를 원할 때, merge는 브랜치 이력을 보존할 때 사용합니다.",
  },
  {
    id: 45,
    category: "Git",
    question: "git stash의 용도는?",
    options: [
      "커밋을 삭제한다",
      "작업 중인 변경사항을 임시 저장하고 워킹 디렉토리를 깨끗하게 만든다",
      "원격 저장소에 푸시한다",
      "브랜치를 생성한다",
    ],
    answer: 1,
    explanation:
      "git stash는 커밋하지 않은 변경사항(staged + unstaged)을 임시 스택에 저장합니다. 급히 다른 브랜치로 전환해야 할 때 유용합니다. git stash pop으로 복원, git stash list로 목록 확인, git stash drop으로 삭제할 수 있습니다.",
  },
  {
    id: 46,
    category: "Git",
    question: "git reset --soft, --mixed, --hard의 차이는?",
    options: [
      "셋 다 동일하게 동작한다",
      "--soft는 HEAD만 이동, --mixed는 HEAD+스테이징 초기화, --hard는 워킹 디렉토리까지 초기화",
      "--hard가 가장 안전하다",
      "--soft가 파일을 삭제한다",
    ],
    answer: 1,
    explanation:
      "--soft: HEAD만 이동하고 변경사항은 staged 상태로 유지. --mixed(기본값): HEAD 이동 + staging area 초기화, 변경사항은 unstaged 상태. --hard: HEAD 이동 + staging + working directory 모두 초기화(변경사항 소실). --hard는 복구가 어려우므로 주의해야 합니다.",
  },
  {
    id: 47,
    category: "Git",
    question: "git cherry-pick의 용도는?",
    options: [
      "브랜치를 삭제한다",
      "다른 브랜치의 특정 커밋만 골라서 현재 브랜치에 적용한다",
      "모든 커밋을 되돌린다",
      "원격 저장소를 클론한다",
    ],
    answer: 1,
    explanation:
      "cherry-pick은 다른 브랜치의 특정 커밋을 현재 브랜치에 복사 적용합니다. 핫픽스를 여러 브랜치에 적용하거나, 특정 기능 커밋만 가져올 때 유용합니다. 새로운 커밋 해시가 생성되므로 남용하면 히스토리가 복잡해질 수 있습니다.",
  },
  // ===== Docker =====
  {
    id: 48,
    category: "Docker",
    question: "Docker에서 이미지와 컨테이너의 관계로 올바른 것은?",
    options: [
      "이미지는 실행 중인 프로세스이다",
      "컨테이너는 이미지의 읽기 전용 스냅샷이다",
      "이미지는 클래스, 컨테이너는 인스턴스에 비유할 수 있다",
      "하나의 이미지에서 하나의 컨테이너만 생성할 수 있다",
    ],
    answer: 2,
    explanation:
      "Docker 이미지는 애플리케이션과 환경을 포함한 읽기 전용 템플릿이고, 컨테이너는 이미지를 실행한 인스턴스입니다. OOP에서 클래스와 인스턴스의 관계와 유사하며, 하나의 이미지에서 여러 컨테이너를 생성할 수 있습니다.",
  },
  {
    id: 49,
    category: "Docker",
    question: "Dockerfile에서 CMD와 ENTRYPOINT의 차이는?",
    options: [
      "CMD는 실행 시 덮어쓸 수 있고, ENTRYPOINT는 항상 실행된다",
      "둘 다 동일하다",
      "ENTRYPOINT가 CMD보다 먼저 실행된다",
      "CMD만 사용할 수 있다",
    ],
    answer: 0,
    explanation:
      "ENTRYPOINT는 컨테이너의 주 실행 명령을 정의하며, docker run 시 인자가 ENTRYPOINT 뒤에 추가됩니다. CMD는 기본 인자를 제공하며, docker run 시 완전히 덮어쓸 수 있습니다. 둘을 조합하면 ENTRYPOINT=명령, CMD=기본 인자 패턴으로 유연하게 사용합니다.",
  },
  {
    id: 50,
    category: "Docker",
    question: "Docker 멀티스테이지 빌드의 주요 장점은?",
    options: [
      "빌드 속도만 빨라진다",
      "빌드 도구를 포함하지 않아 최종 이미지 크기를 줄일 수 있다",
      "하나의 컨테이너에서 여러 서비스를 실행한다",
      "Docker Compose가 필요 없어진다",
    ],
    answer: 1,
    explanation:
      "멀티스테이지 빌드는 빌드 단계와 실행 단계를 분리합니다. 빌드 스테이지에서 컴파일러, SDK 등으로 빌드하고, 최종 스테이지에는 빌드 결과만 복사합니다. Go 바이너리 빌드 시 1GB+ 빌드 이미지 → 수십MB 실행 이미지로 줄일 수 있습니다.",
  },
  {
    id: 51,
    category: "Docker",
    question: "Docker 볼륨(Volume)을 사용하는 이유는?",
    options: [
      "컨테이너 CPU 성능을 높이기 위해",
      "컨테이너가 삭제되어도 데이터를 영속적으로 보관하기 위해",
      "이미지 크기를 줄이기 위해",
      "네트워크 속도를 높이기 위해",
    ],
    answer: 1,
    explanation:
      "컨테이너의 파일 시스템은 컨테이너 삭제 시 함께 사라집니다. Docker 볼륨은 호스트에 데이터를 저장하여 컨테이너 생명주기와 독립적으로 데이터를 보관합니다. 데이터베이스, 로그, 설정 파일 등 영속성이 필요한 데이터에 필수적입니다.",
  },
  // ===== 네트워크 =====
  {
    id: 52,
    category: "네트워크",
    question: "TCP와 UDP의 차이점으로 올바른 것은?",
    options: [
      "UDP는 연결 지향 프로토콜이다",
      "TCP는 데이터 순서를 보장하지 않는다",
      "TCP는 신뢰성 있는 전송을 보장하고, UDP는 빠르지만 신뢰성을 보장하지 않는다",
      "TCP와 UDP 모두 3-way handshake를 사용한다",
    ],
    answer: 2,
    explanation:
      "TCP는 연결 지향적이며 3-way handshake로 연결을 수립하고, 데이터 순서와 전달을 보장합니다. UDP는 비연결형으로 handshake 없이 빠르게 전송하지만 신뢰성을 보장하지 않습니다. 실시간 스트리밍, 게임 등에는 UDP가, 웹/이메일 등에는 TCP가 적합합니다.",
  },
  {
    id: 53,
    category: "네트워크",
    question: "DNS(Domain Name System)의 역할은?",
    options: [
      "데이터를 암호화한다",
      "도메인 이름을 IP 주소로 변환한다",
      "방화벽 역할을 한다",
      "로드 밸런싱만 수행한다",
    ],
    answer: 1,
    explanation:
      "DNS는 사람이 읽을 수 있는 도메인 이름(예: google.com)을 컴퓨터가 이해하는 IP 주소(예: 142.250.80.46)로 변환합니다. 재귀적 질의를 통해 루트 → TLD → 권한 있는 네임서버 순으로 조회합니다. DNS 캐싱으로 성능을 최적화합니다.",
  },
  {
    id: 54,
    category: "네트워크",
    question: "OSI 7계층에서 전송 계층(Transport Layer)은 몇 번째 계층인가?",
    options: ["3계층", "4계층", "5계층", "6계층"],
    answer: 1,
    explanation:
      "전송 계층은 4계층으로 TCP, UDP가 여기에 속합니다. 1-물리, 2-데이터링크, 3-네트워크(IP), 4-전송(TCP/UDP), 5-세션, 6-표현, 7-응용(HTTP) 순서입니다. 실무에서는 TCP/IP 4계층 모델이 더 자주 사용됩니다.",
  },
  {
    id: 55,
    category: "네트워크",
    question: "WebSocket과 HTTP의 차이는?",
    options: [
      "WebSocket은 단방향 통신만 지원한다",
      "WebSocket은 연결을 유지하여 양방향 실시간 통신이 가능하고, HTTP는 요청-응답 방식이다",
      "HTTP가 WebSocket보다 실시간 통신에 유리하다",
      "WebSocket은 HTTP를 대체한다",
    ],
    answer: 1,
    explanation:
      "HTTP는 클라이언트가 요청하면 서버가 응답하는 단방향 방식입니다. WebSocket은 초기 HTTP 핸드셰이크 후 TCP 연결을 유지하여 서버와 클라이언트가 자유롭게 메시지를 주고받는 양방향(full-duplex) 통신을 합니다. 채팅, 실시간 알림 등에 적합합니다.",
  },
  // ===== 보안 =====
  {
    id: 56,
    category: "보안",
    question: "SQL Injection을 방지하는 가장 효과적인 방법은?",
    options: [
      "사용자 입력을 대문자로 변환한다",
      "Prepared Statement(파라미터화된 쿼리)를 사용한다",
      "에러 메시지를 숨긴다",
      "데이터베이스 포트를 변경한다",
    ],
    answer: 1,
    explanation:
      "Prepared Statement(파라미터화된 쿼리)는 SQL 쿼리와 데이터를 분리하여 공격자가 SQL 구문을 주입할 수 없게 합니다. 에러 메시지 숨기기나 포트 변경은 보조적 수단일 뿐, 근본적 해결책이 아닙니다. OWASP Top 10에서도 가장 권장하는 방법입니다.",
  },
  {
    id: 57,
    category: "보안",
    question: "JWT(JSON Web Token)에 대한 설명으로 올바른 것은?",
    options: [
      "JWT는 항상 암호화되어 내용을 볼 수 없다",
      "JWT는 Header, Payload, Signature 세 부분으로 구성된다",
      "JWT는 서버에 세션을 저장해야 한다",
      "JWT는 만료 시간을 설정할 수 없다",
    ],
    answer: 1,
    explanation:
      "JWT는 Header(알고리즘, 토큰 타입), Payload(클레임 데이터), Signature(서명) 세 부분이 점(.)으로 구분된 Base64 인코딩 문자열입니다. 기본적으로 서명만 되고 암호화되지 않으므로 Payload는 누구나 읽을 수 있습니다. 민감한 정보는 넣지 않아야 합니다.",
  },
  {
    id: 58,
    category: "보안",
    question: "XSS(Cross-Site Scripting) 공격을 방지하는 방법은?",
    options: [
      "HTTPS를 사용한다",
      "사용자 입력을 HTML 이스케이프 처리한다",
      "데이터베이스를 암호화한다",
      "세션 타임아웃을 설정한다",
    ],
    answer: 1,
    explanation:
      "XSS는 악성 스크립트를 웹 페이지에 삽입하는 공격입니다. 사용자 입력을 HTML 특수문자(&lt;, &gt;, &amp; 등)로 이스케이프하고, Content Security Policy(CSP) 헤더를 설정하며, React/Vue 등 프레임워크의 자동 이스케이프 기능을 활용하여 방지합니다.",
  },
  {
    id: 59,
    category: "보안",
    question: "HTTPS에서 TLS 핸드셰이크의 역할은?",
    options: [
      "데이터를 압축한다",
      "클라이언트와 서버가 암호화 방식을 합의하고 세션 키를 교환한다",
      "DNS 조회를 수행한다",
      "로드 밸런싱을 결정한다",
    ],
    answer: 1,
    explanation:
      "TLS 핸드셰이크에서 클라이언트-서버는 지원 암호화 스위트를 교환하고, 서버 인증서를 검증하며, 비대칭 암호화로 세션 키를 안전하게 교환합니다. 이후 통신은 대칭 암호화(세션 키)로 빠르게 진행됩니다. TLS 1.3은 1-RTT로 핸드셰이크를 단축했습니다.",
  },
  {
    id: 60,
    category: "보안",
    question: "OAuth 2.0의 Authorization Code Flow에서 가장 먼저 발생하는 것은?",
    options: [
      "액세스 토큰 발급",
      "사용자가 인증 서버에서 로그인하고 권한 부여를 승인",
      "리소스 서버에 API 요청",
      "리프레시 토큰 갱신",
    ],
    answer: 1,
    explanation:
      "Authorization Code Flow: (1) 클라이언트가 사용자를 인증 서버로 리다이렉트 → (2) 사용자 로그인/승인 → (3) 인가 코드 발급 → (4) 클라이언트가 인가 코드로 액세스 토큰 교환 → (5) 토큰으로 API 호출. PKCE 확장을 함께 사용하는 것이 권장됩니다.",
  },
  // ===== DevOps =====
  {
    id: 61,
    category: "DevOps",
    question: "CI/CD에서 CI(Continuous Integration)의 핵심 목적은?",
    options: [
      "프로덕션 서버에 자동 배포하는 것",
      "코드 변경사항을 자주 통합하고 자동으로 빌드/테스트하는 것",
      "수동 코드 리뷰를 대체하는 것",
      "개발 환경을 자동으로 설정하는 것",
    ],
    answer: 1,
    explanation:
      "CI(Continuous Integration)는 개발자들의 코드 변경사항을 메인 브랜치에 자주 통합하고, 자동으로 빌드와 테스트를 수행하여 통합 문제를 조기에 발견하는 것이 핵심입니다. CD(Continuous Delivery/Deployment)가 자동 배포를 담당합니다.",
  },
  {
    id: 62,
    category: "DevOps",
    question: "Kubernetes에서 Pod란?",
    options: [
      "물리 서버를 의미한다",
      "하나 이상의 컨테이너를 포함하는 배포 가능한 최소 단위이다",
      "네트워크 로드밸런서이다",
      "저장소 볼륨이다",
    ],
    answer: 1,
    explanation:
      "Pod는 Kubernetes의 최소 배포 단위로, 하나 이상의 컨테이너가 같은 네트워크 네임스페이스와 스토리지를 공유합니다. 보통 하나의 메인 컨테이너 + 사이드카 패턴으로 구성됩니다. Pod는 일시적(ephemeral)이므로 Deployment로 관리합니다.",
  },
  {
    id: 63,
    category: "DevOps",
    question: "블루-그린 배포(Blue-Green Deployment)란?",
    options: [
      "두 개의 동일한 환경을 유지하고 트래픽을 새 버전으로 한 번에 전환하는 배포 방식",
      "점진적으로 트래픽을 새 버전으로 옮기는 방식",
      "하나의 서버에서 두 버전을 동시에 실행하는 것",
      "테스트 없이 배포하는 방식",
    ],
    answer: 0,
    explanation:
      "블루-그린 배포는 Blue(현재 버전)와 Green(새 버전) 두 환경을 유지하고, 새 버전 검증 후 로드밸런서를 전환하여 즉시 배포합니다. 문제 시 즉시 롤백이 가능합니다. 카나리 배포는 트래픽을 점진적으로 옮기는 방식입니다.",
  },
  {
    id: 64,
    category: "DevOps",
    question: "Infrastructure as Code(IaC)의 대표 도구로 올바른 것은?",
    options: [
      "Photoshop",
      "Terraform",
      "Excel",
      "Slack",
    ],
    answer: 1,
    explanation:
      "Terraform(HashiCorp)은 클라우드 인프라를 코드로 선언하여 버전 관리, 재현 가능한 배포, 팀 협업을 가능하게 합니다. AWS CloudFormation, Pulumi, Ansible 등도 IaC 도구입니다. 인프라 변경을 코드 리뷰, CI/CD에 통합할 수 있습니다.",
  },
  // ===== Python =====
  {
    id: 65,
    category: "Python",
    question: "Python에서 리스트 컴프리헨션의 올바른 설명은?",
    options: [
      "for문보다 항상 느리다",
      "기존 리스트를 직접 수정(mutate)한다",
      "간결한 문법으로 새로운 리스트를 생성하는 방법이다",
      "중첩 사용이 불가능하다",
    ],
    answer: 2,
    explanation:
      "리스트 컴프리헨션은 [expression for item in iterable if condition] 형태로 새로운 리스트를 간결하게 생성합니다. 일반 for문보다 빠른 경우가 많고, 중첩도 가능합니다. 기존 리스트를 수정하지 않고 새 리스트를 반환하므로 함수형 프로그래밍 스타일에 적합합니다.",
  },
  {
    id: 66,
    category: "Python",
    question: "Python의 GIL(Global Interpreter Lock)이란?",
    options: [
      "멀티스레드 성능을 높이는 기술이다",
      "한 번에 하나의 스레드만 Python 바이트코드를 실행할 수 있게 하는 뮤텍스이다",
      "메모리 누수를 방지하는 기능이다",
      "Python 3에서 제거되었다",
    ],
    answer: 1,
    explanation:
      "GIL은 CPython에서 한 번에 하나의 스레드만 Python 바이트코드를 실행하도록 제한합니다. CPU 바운드 작업에서 멀티스레드 성능이 제한되지만, I/O 바운드에서는 영향이 적습니다. CPU 바운드 병렬 처리는 multiprocessing이나 asyncio를 사용합니다.",
  },
  {
    id: 67,
    category: "Python",
    question: "Python에서 데코레이터(@decorator)의 역할은?",
    options: [
      "변수를 상수로 만든다",
      "함수를 감싸서 실행 전후에 추가 동작을 수행하는 고차 함수이다",
      "클래스를 삭제하는 기능이다",
      "예외 처리를 자동화한다",
    ],
    answer: 1,
    explanation:
      "데코레이터는 함수나 클래스를 인자로 받아 기능을 추가한 새로운 함수/클래스를 반환하는 패턴입니다. @login_required, @staticmethod, @property 등이 대표적입니다. 로깅, 인증, 캐싱, 유효성 검사 등 횡단 관심사(cross-cutting concerns)에 활용됩니다.",
  },
  {
    id: 68,
    category: "Python",
    question: "Python에서 is와 ==의 차이는?",
    options: [
      "차이가 없다",
      "is는 객체 동일성(identity), ==는 값 동등성(equality)을 비교한다",
      "==가 is보다 항상 빠르다",
      "is는 문자열에만 사용한다",
    ],
    answer: 1,
    explanation:
      "is는 두 변수가 같은 객체(메모리 주소)를 가리키는지 확인합니다(id(a) == id(b)). ==는 값이 같은지 비교합니다(__eq__ 호출). None 비교 시 'x is None'을 사용하는 것이 관용적입니다. 작은 정수(-5~256)는 인터닝되어 is가 True일 수 있지만, 이에 의존하면 안 됩니다.",
  },
  // ===== 디자인 패턴 =====
  {
    id: 69,
    category: "디자인 패턴",
    question: "싱글턴(Singleton) 패턴의 목적은?",
    options: [
      "객체를 빠르게 복제하기 위해",
      "클래스의 인스턴스가 하나만 존재하도록 보장하기 위해",
      "상속 구조를 단순화하기 위해",
      "비동기 처리를 간편하게 하기 위해",
    ],
    answer: 1,
    explanation:
      "싱글턴 패턴은 클래스의 인스턴스가 오직 하나만 생성되도록 보장하고, 전역적인 접근점을 제공합니다. 데이터베이스 연결 풀, 설정 관리자, 로거 등에 주로 사용됩니다. 다만 테스트가 어려워지고 전역 상태를 만들므로 남용은 피해야 합니다.",
  },
  {
    id: 70,
    category: "디자인 패턴",
    question: "옵저버(Observer) 패턴의 핵심 개념은?",
    options: [
      "하나의 객체가 다른 객체를 직접 호출한다",
      "주체(Subject)의 상태 변화를 관찰자(Observer)들에게 자동으로 통지한다",
      "객체를 복제하는 패턴이다",
      "데이터를 캐싱하는 패턴이다",
    ],
    answer: 1,
    explanation:
      "옵저버 패턴은 일대다 의존 관계에서 주체의 상태가 변경되면 등록된 모든 관찰자에게 자동 통지합니다. 이벤트 시스템, React의 상태 관리, 실시간 알림 등에 널리 사용됩니다. 발행-구독(Pub/Sub) 패턴은 중간에 메시지 브로커를 두는 변형입니다.",
  },
  {
    id: 71,
    category: "디자인 패턴",
    question: "의존성 주입(Dependency Injection)의 주요 장점은?",
    options: [
      "코드 실행 속도가 빨라진다",
      "결합도를 낮추고 테스트 용이성을 높인다",
      "메모리 사용량이 줄어든다",
      "코드 줄 수가 줄어든다",
    ],
    answer: 1,
    explanation:
      "DI는 객체가 직접 의존성을 생성하지 않고 외부에서 주입받는 패턴입니다. 인터페이스에 의존하여 결합도를 낮추고, 테스트 시 Mock 객체를 쉽게 주입할 수 있습니다. Spring, NestJS, Go의 wire 등 많은 프레임워크가 DI를 핵심으로 사용합니다.",
  },
  {
    id: 72,
    category: "디자인 패턴",
    question: "팩토리 패턴(Factory Pattern)의 목적은?",
    options: [
      "객체 생성 로직을 캡슐화하여 클라이언트 코드와 분리한다",
      "객체를 삭제하는 패턴이다",
      "상속을 제거하는 패턴이다",
      "비동기 처리 전용 패턴이다",
    ],
    answer: 0,
    explanation:
      "팩토리 패턴은 객체 생성을 전담하는 클래스/함수를 두어 생성 로직을 캡슐화합니다. 클라이언트는 구체적인 클래스를 몰라도 인터페이스로 객체를 사용할 수 있습니다. Simple Factory, Factory Method, Abstract Factory 변형이 있으며, 확장에 열려 있고 수정에 닫힌(OCP) 설계를 가능하게 합니다.",
  },
  // ===== Linux =====
  {
    id: 73,
    category: "Linux",
    question: "Linux에서 프로세스에 SIGKILL(kill -9) 시그널을 보내면?",
    options: [
      "프로세스가 시그널을 무시할 수 있다",
      "프로세스가 cleanup 작업을 수행한 후 종료된다",
      "프로세스가 즉시 강제 종료되며 cleanup이 불가능하다",
      "프로세스가 재시작된다",
    ],
    answer: 2,
    explanation:
      "SIGKILL(9)은 커널이 프로세스를 즉시 강제 종료시키는 시그널로, 프로세스가 이를 잡거나(catch) 무시할 수 없습니다. 따라서 cleanup 코드가 실행되지 않습니다. 정상 종료를 원하면 SIGTERM(15)을 먼저 보내고, 응답이 없을 때 SIGKILL을 사용하는 것이 권장됩니다.",
  },
  {
    id: 74,
    category: "Linux",
    question: "Linux 파일 권한에서 chmod 755의 의미는?",
    options: [
      "소유자: 읽기만, 그룹: 쓰기만, 기타: 실행만",
      "소유자: rwx(7), 그룹: r-x(5), 기타: r-x(5)",
      "모든 사용자에게 모든 권한 부여",
      "파일을 삭제 불가능하게 만든다",
    ],
    answer: 1,
    explanation:
      "chmod의 숫자는 읽기(4)+쓰기(2)+실행(1)의 합입니다. 755 = 소유자(7=4+2+1: rwx) + 그룹(5=4+1: r-x) + 기타(5=4+1: r-x). 스크립트나 실행 파일에 일반적으로 사용됩니다. 644는 파일(rw-r--r--), 755는 디렉토리/실행파일에 자주 사용됩니다.",
  },
  {
    id: 75,
    category: "Linux",
    question: "Linux에서 파이프(|)의 역할은?",
    options: [
      "파일을 복사한다",
      "앞 명령의 표준 출력을 뒤 명령의 표준 입력으로 전달한다",
      "두 명령을 동시에 실행한다",
      "에러를 무시한다",
    ],
    answer: 1,
    explanation:
      "파이프(|)는 앞 명령(stdout)의 출력을 뒤 명령(stdin)의 입력으로 연결합니다. 예: ls -la | grep '.txt' | wc -l은 파일 목록에서 .txt 파일만 필터링하고 개수를 세는 파이프라인입니다. Unix 철학의 핵심인 '하나의 일을 잘 하는 작은 프로그램'을 조합하는 방식입니다.",
  },
  {
    id: 76,
    category: "Linux",
    question: "Linux에서 /etc 디렉토리의 주요 용도는?",
    options: [
      "사용자 홈 디렉토리를 저장한다",
      "시스템 설정 파일들을 저장한다",
      "임시 파일을 저장한다",
      "커널 모듈을 저장한다",
    ],
    answer: 1,
    explanation:
      "/etc는 시스템 전체 설정 파일이 위치합니다. /etc/passwd(사용자 정보), /etc/hosts(호스트명-IP 매핑), /etc/nginx/(웹서버 설정) 등이 있습니다. /home은 사용자 홈, /tmp는 임시 파일, /lib는 라이브러리, /var는 가변 데이터를 저장합니다.",
  },
  // ===== 추가 주제들 =====
  {
    id: 77,
    category: "아키텍처",
    question: "마이크로서비스 아키텍처의 장점은?",
    options: [
      "모놀리식보다 항상 간단하다",
      "서비스별 독립 배포, 기술 스택 선택의 자유, 장애 격리가 가능하다",
      "네트워크 통신이 필요 없다",
      "데이터베이스를 하나만 사용한다",
    ],
    answer: 1,
    explanation:
      "마이크로서비스는 각 서비스가 독립적으로 배포, 확장, 기술 선택이 가능합니다. 하나의 서비스 장애가 전체에 영향을 주지 않습니다. 단점으로 분산 시스템 복잡성, 서비스 간 통신 오버헤드, 데이터 일관성 관리의 어려움이 있습니다.",
  },
  {
    id: 78,
    category: "아키텍처",
    question: "CAP 정리(Theorem)에 대한 설명으로 올바른 것은?",
    options: [
      "분산 시스템은 세 가지 모두 항상 보장할 수 있다",
      "일관성(C), 가용성(A), 분할 허용성(P) 중 최대 두 가지만 동시에 보장할 수 있다",
      "CAP는 단일 서버에만 적용된다",
      "C는 Caching을 의미한다",
    ],
    answer: 1,
    explanation:
      "CAP 정리는 분산 시스템에서 일관성(Consistency), 가용성(Availability), 분할 허용성(Partition tolerance) 세 가지를 동시에 모두 보장할 수 없다는 이론입니다. 네트워크 분할은 불가피하므로 실제로는 CP(강한 일관성) vs AP(높은 가용성) 사이에서 선택합니다.",
  },
  {
    id: 79,
    category: "아키텍처",
    question: "이벤트 드리븐 아키텍처(EDA)의 핵심 개념은?",
    options: [
      "동기적으로 순차 처리한다",
      "이벤트를 발행하고, 관심 있는 소비자가 비동기적으로 처리하는 구조이다",
      "단일 스레드에서만 동작한다",
      "REST API만 사용한다",
    ],
    answer: 1,
    explanation:
      "EDA는 서비스 간 직접 호출 대신 이벤트(메시지)를 발행하고, 관심 있는 서비스가 구독하여 비동기 처리합니다. Kafka, RabbitMQ, AWS SNS/SQS 등을 사용합니다. 느슨한 결합, 확장성, 장애 격리에 유리하지만 이벤트 순서 보장, 디버깅이 어려울 수 있습니다.",
  },
  {
    id: 80,
    category: "캐싱",
    question: "Redis를 캐시로 사용할 때의 주요 장점은?",
    options: [
      "디스크 기반이라 데이터가 영구적이다",
      "인메모리 기반으로 매우 빠른 읽기/쓰기가 가능하다",
      "SQL 쿼리를 지원한다",
      "관계형 데이터 모델링에 최적이다",
    ],
    answer: 1,
    explanation:
      "Redis는 인메모리 데이터 스토어로 O(1) 수준의 빠른 읽기/쓰기가 가능합니다. String, Hash, List, Set, Sorted Set 등 다양한 자료구조를 지원합니다. 캐시, 세션 저장, 실시간 리더보드, 메시지 브로커 등에 활용됩니다. AOF/RDB로 영속성도 제공합니다.",
  },
  {
    id: 81,
    category: "캐싱",
    question: "캐시 무효화(Cache Invalidation) 전략 중 TTL(Time To Live)이란?",
    options: [
      "캐시를 영구히 유지하는 것",
      "설정된 시간이 지나면 캐시를 자동으로 만료시키는 방식",
      "캐시를 즉시 삭제하는 것",
      "캐시를 다른 서버로 이동시키는 것",
    ],
    answer: 1,
    explanation:
      "TTL은 캐시 항목에 유효 시간을 설정하여 자동 만료시킵니다. 구현이 간단하지만, TTL이 너무 짧으면 캐시 효율이 낮고, 너무 길면 stale 데이터 위험이 있습니다. Write-through(쓰기 시 캐시 갱신), Write-behind(비동기 갱신), Cache-aside(읽기 시 캐시 없으면 DB 조회 후 저장) 등의 전략과 조합합니다.",
  },
  {
    id: 82,
    category: "테스팅",
    question: "단위 테스트(Unit Test)와 통합 테스트(Integration Test)의 차이는?",
    options: [
      "단위 테스트가 통합 테스트보다 느리다",
      "단위 테스트는 개별 함수/모듈을, 통합 테스트는 모듈 간 상호작용을 검증한다",
      "통합 테스트는 UI만 테스트한다",
      "둘 다 동일하다",
    ],
    answer: 1,
    explanation:
      "단위 테스트는 함수, 메서드, 클래스 등 개별 단위를 격리하여 테스트하며, Mock을 사용해 의존성을 제거합니다. 통합 테스트는 여러 모듈, DB, API 등 실제 의존성 간의 상호작용을 검증합니다. 테스트 피라미드: 단위(많이) → 통합(중간) → E2E(적게).",
  },
  {
    id: 83,
    category: "테스팅",
    question: "TDD(Test-Driven Development)의 올바른 순서는?",
    options: [
      "구현 → 테스트 → 리팩토링",
      "테스트 작성(Red) → 최소 구현(Green) → 리팩토링(Refactor)",
      "리팩토링 → 테스트 → 구현",
      "설계 → 구현 → 테스트 → 배포",
    ],
    answer: 1,
    explanation:
      "TDD의 Red-Green-Refactor 사이클: (1) Red: 실패하는 테스트를 먼저 작성, (2) Green: 테스트를 통과하는 최소한의 코드 구현, (3) Refactor: 코드를 깔끔하게 정리. 이 짧은 사이클을 반복하며 점진적으로 개발합니다.",
  },
  {
    id: 84,
    category: "운영체제",
    question: "프로세스와 스레드의 차이는?",
    options: [
      "프로세스와 스레드는 동일하다",
      "프로세스는 독립된 메모리 공간, 스레드는 같은 프로세스 내 메모리를 공유한다",
      "스레드가 프로세스보다 무겁다",
      "하나의 프로세스에는 하나의 스레드만 존재한다",
    ],
    answer: 1,
    explanation:
      "프로세스는 독립된 메모리 공간(코드, 데이터, 힙, 스택)을 가지며 IPC로 통신합니다. 스레드는 같은 프로세스 내에서 코드/데이터/힙을 공유하고 개별 스택만 가집니다. 스레드가 가볍고 빠르지만, 공유 메모리로 인한 동기화 문제에 주의해야 합니다.",
  },
  {
    id: 85,
    category: "운영체제",
    question: "데드락(Deadlock)이 발생하는 네 가지 필요 조건이 아닌 것은?",
    options: [
      "상호 배제 (Mutual Exclusion)",
      "점유 대기 (Hold and Wait)",
      "선점 (Preemption)",
      "순환 대기 (Circular Wait)",
    ],
    answer: 2,
    explanation:
      "데드락의 4가지 필요 조건: (1) 상호 배제, (2) 점유 대기, (3) 비선점(Non-preemption), (4) 순환 대기. '선점'이 아닌 '비선점'이 조건입니다. 네 조건 중 하나라도 깨면 데드락을 예방할 수 있습니다. 실무에서는 타임아웃, 순서 정의 등으로 해결합니다.",
  },
  {
    id: 86,
    category: "운영체제",
    question: "가상 메모리(Virtual Memory)의 주요 목적은?",
    options: [
      "CPU 속도를 높인다",
      "물리 메모리보다 큰 주소 공간을 프로세스에 제공하고, 메모리 격리를 보장한다",
      "디스크 공간을 줄인다",
      "네트워크 속도를 높인다",
    ],
    answer: 1,
    explanation:
      "가상 메모리는 각 프로세스에 독립된 가상 주소 공간을 제공하여 메모리 격리를 보장하고, 페이징/스와핑으로 물리 메모리보다 큰 공간을 사용할 수 있게 합니다. 페이지 테이블로 가상→물리 주소를 매핑하며, TLB 캐시로 변환 속도를 높입니다.",
  },
  {
    id: 87,
    category: "클라우드",
    question: "서버리스(Serverless) 컴퓨팅의 특징은?",
    options: [
      "서버가 아예 존재하지 않는다",
      "개발자가 서버 관리 없이 코드를 실행하고, 사용한 만큼만 과금된다",
      "항상 VM보다 저렴하다",
      "상태를 서버에 저장할 수 있다",
    ],
    answer: 1,
    explanation:
      "서버리스(AWS Lambda, Cloud Functions 등)는 서버가 없는 게 아니라 서버 관리를 클라우드에 위임합니다. 이벤트 기반으로 실행되고, 사용 시간/횟수만큼 과금됩니다. Cold start 지연, 실행 시간 제한, 상태 비저장(stateless) 등의 제약이 있습니다.",
  },
  {
    id: 88,
    category: "클라우드",
    question: "로드 밸런서(Load Balancer)의 주요 역할은?",
    options: [
      "데이터를 암호화한다",
      "들어오는 트래픽을 여러 서버에 분산시켜 가용성과 성능을 높인다",
      "데이터베이스를 백업한다",
      "DNS 서버를 관리한다",
    ],
    answer: 1,
    explanation:
      "로드 밸런서는 트래픽을 여러 서버에 분산하여 단일 장애점을 제거하고 성능을 높입니다. 라운드 로빈, 최소 연결, 가중치 기반 등의 알고리즘을 사용합니다. L4(전송 계층)와 L7(응용 계층) 로드밸런서가 있으며, 헬스 체크로 장애 서버를 자동 제외합니다.",
  },
  {
    id: 89,
    category: "함수형 프로그래밍",
    question: "순수 함수(Pure Function)의 조건은?",
    options: [
      "전역 변수를 사용해야 한다",
      "같은 입력에 항상 같은 출력을 반환하고, 부수 효과(side effect)가 없어야 한다",
      "반드시 재귀를 사용해야 한다",
      "비동기여야 한다",
    ],
    answer: 1,
    explanation:
      "순수 함수는 (1) 동일 입력 → 동일 출력(결정적), (2) 외부 상태 변경 없음(부수 효과 없음)을 만족합니다. 테스트, 캐싱, 병렬 실행이 쉽고 예측 가능합니다. React의 함수형 컴포넌트, Redux의 리듀서 등이 순수 함수 원칙을 따릅니다.",
  },
  {
    id: 90,
    category: "함수형 프로그래밍",
    question: "불변성(Immutability)이 중요한 이유는?",
    options: [
      "메모리를 더 적게 사용하기 위해",
      "예측 가능하고 안전한 코드를 작성하며, 동시성 문제를 방지하기 위해",
      "코드를 더 짧게 작성하기 위해",
      "실행 속도를 높이기 위해",
    ],
    answer: 1,
    explanation:
      "불변 데이터는 한번 생성되면 변경되지 않으므로 (1) 상태 변화 추적이 쉽고, (2) 동시성 환경에서 안전하며, (3) 변경 감지가 빠릅니다(참조 비교). React의 상태 관리, Redux, Go의 값 타입 등이 불변성을 활용합니다. Structural sharing으로 메모리 효율도 높일 수 있습니다.",
  },
  {
    id: 91,
    category: "웹 성능",
    question: "웹 페이지 로딩 성능을 측정하는 Core Web Vitals 지표가 아닌 것은?",
    options: [
      "LCP (Largest Contentful Paint)",
      "FID (First Input Delay)",
      "CLS (Cumulative Layout Shift)",
      "TTB (Time To Build)",
    ],
    answer: 3,
    explanation:
      "Core Web Vitals: LCP(최대 콘텐츠 렌더링 시간, 2.5초 이내 권장), INP(Interaction to Next Paint, FID 대체), CLS(레이아웃 이동 누적 점수, 0.1 이내 권장). TTB는 실제 존재하지 않는 지표입니다. 이 지표들은 Google 검색 순위에도 영향을 줍니다.",
  },
  {
    id: 92,
    category: "웹 성능",
    question: "CDN(Content Delivery Network)의 역할은?",
    options: [
      "데이터베이스를 최적화한다",
      "전 세계 엣지 서버에 콘텐츠를 캐싱하여 사용자에게 가까운 곳에서 제공한다",
      "서버 코드를 컴파일한다",
      "SSL 인증서를 발급한다",
    ],
    answer: 1,
    explanation:
      "CDN은 전 세계 엣지 서버에 정적 자산(이미지, CSS, JS)을 캐싱하여 사용자와 물리적으로 가까운 서버에서 전달합니다. 지연시간(latency) 감소, 원본 서버 부하 감소, DDoS 방어 등의 효과가 있습니다. Cloudflare, AWS CloudFront 등이 대표적입니다.",
  },
  {
    id: 93,
    category: "정규식",
    question: "정규식에서 ^와 $의 의미는?",
    options: [
      "^는 NOT, $는 숫자를 의미한다",
      "^는 문자열의 시작, $는 문자열의 끝을 나타낸다",
      "둘 다 특수문자 이스케이프이다",
      "^는 OR, $는 AND이다",
    ],
    answer: 1,
    explanation:
      "^는 문자열(또는 줄)의 시작 위치, $는 끝 위치를 나타내는 앵커입니다. 예: ^Hello$는 정확히 'Hello'만 매칭합니다. 문자 클래스 안의 ^([^abc])는 부정(NOT)을 의미합니다. 이메일, URL 등의 유효성 검사에 자주 사용됩니다.",
  },
  {
    id: 94,
    category: "데이터베이스",
    question: "데이터베이스에서 트랜잭션 격리 수준(Isolation Level) 중 가장 높은 수준은?",
    options: [
      "Read Uncommitted",
      "Read Committed",
      "Repeatable Read",
      "Serializable",
    ],
    answer: 3,
    explanation:
      "격리 수준 (낮음→높음): Read Uncommitted → Read Committed → Repeatable Read → Serializable. 수준이 높을수록 동시성 문제(Dirty Read, Non-repeatable Read, Phantom Read)를 방지하지만 성능이 저하됩니다. 대부분의 DB는 Read Committed(PostgreSQL 기본)나 Repeatable Read(MySQL InnoDB 기본)를 사용합니다.",
  },
  {
    id: 95,
    category: "네트워크",
    question: "gRPC와 REST의 차이점은?",
    options: [
      "gRPC는 JSON만 사용한다",
      "gRPC는 Protocol Buffers를 사용하여 바이너리 직렬화하고, HTTP/2 기반으로 양방향 스트리밍을 지원한다",
      "REST가 gRPC보다 항상 빠르다",
      "gRPC는 브라우저에서 직접 사용할 수 없다는 단점이 없다",
    ],
    answer: 1,
    explanation:
      "gRPC는 Protocol Buffers(protobuf)로 바이너리 직렬화하여 JSON보다 빠르고 작은 페이로드를 전송합니다. HTTP/2 기반으로 멀티플렉싱, 양방향 스트리밍을 지원합니다. 마이크로서비스 간 통신에 적합하지만, 브라우저에서 직접 사용이 제한적(gRPC-Web 필요)입니다.",
  },
  {
    id: 96,
    category: "JavaScript",
    question: "JavaScript에서 WeakMap과 Map의 차이는?",
    options: [
      "차이가 없다",
      "WeakMap의 키는 객체만 가능하며, 키 객체에 대한 약한 참조를 유지하여 가비지 컬렉션이 가능하다",
      "WeakMap이 Map보다 빠르다",
      "Map은 객체를 키로 사용할 수 없다",
    ],
    answer: 1,
    explanation:
      "WeakMap은 키로 객체만 사용 가능하며, 해당 객체에 대한 약한 참조(weak reference)를 유지합니다. 키 객체가 다른 곳에서 참조되지 않으면 GC됩니다. 이터러블이 아니고 size 속성이 없습니다. DOM 요소에 메타데이터를 연결하거나 private 데이터 저장에 유용합니다.",
  },
  {
    id: 97,
    category: "Go",
    question: "Go에서 context 패키지의 주요 용도는?",
    options: [
      "데이터베이스 연결을 관리한다",
      "요청 범위의 값 전달, 취소 신호 전파, 타임아웃/데드라인 설정에 사용한다",
      "로깅을 위한 패키지이다",
      "테스트 전용 패키지이다",
    ],
    answer: 1,
    explanation:
      "context.Context는 API 경계를 넘어 마감 시한, 취소 신호, 요청 범위 값을 전달합니다. context.WithCancel, WithTimeout, WithDeadline으로 생성하고, ctx.Done() 채널로 취소를 감지합니다. HTTP 핸들러, DB 쿼리 등에서 필수적으로 사용됩니다.",
  },
  {
    id: 98,
    category: "보안",
    question: "bcrypt로 비밀번호를 해싱하는 이유는?",
    options: [
      "해시 속도가 빠르기 때문이다",
      "솔트(salt)를 자동 생성하고, 의도적으로 느리게 설계되어 브루트포스 공격에 강하다",
      "양방향 암호화를 지원하기 때문이다",
      "해시 결과가 항상 동일하기 때문이다",
    ],
    answer: 1,
    explanation:
      "bcrypt는 (1) 자동 솔트 생성으로 레인보우 테이블 공격 방지, (2) cost factor로 해싱 속도를 조절하여 GPU 브루트포스에 저항, (3) 같은 비밀번호도 매번 다른 해시 생성. SHA-256 등 빠른 해시는 비밀번호 저장에 부적합합니다. argon2도 좋은 대안입니다.",
  },
  {
    id: 99,
    category: "React",
    question: "React에서 Context API의 주요 용도는?",
    options: [
      "HTTP 요청을 보내기 위해",
      "컴포넌트 트리에서 props drilling 없이 데이터를 전달하기 위해",
      "라우팅을 처리하기 위해",
      "애니메이션을 구현하기 위해",
    ],
    answer: 1,
    explanation:
      "Context API는 테마, 로케일, 인증 상태 등 여러 컴포넌트가 공유하는 데이터를 props를 일일이 전달하지 않고 트리 전체에 제공합니다. Provider가 값을 제공하고, useContext로 소비합니다. 빈번한 업데이트에는 성능 이슈가 있을 수 있어 상태 관리 라이브러리와 함께 사용하기도 합니다.",
  },
  {
    id: 100,
    category: "데이터베이스",
    question: "데이터베이스 커넥션 풀(Connection Pool)을 사용하는 이유는?",
    options: [
      "데이터를 암호화하기 위해",
      "매 요청마다 새 연결을 생성하는 오버헤드를 줄이고, 연결을 재사용하기 위해",
      "SQL 쿼리를 최적화하기 위해",
      "데이터를 캐싱하기 위해",
    ],
    answer: 1,
    explanation:
      "DB 연결 생성은 TCP 핸드셰이크, 인증 등으로 비용이 큽니다. 커넥션 풀은 미리 연결을 생성해두고 재사용하여 (1) 연결 생성 오버헤드 감소, (2) 동시 연결 수 제한으로 DB 보호, (3) 응답 시간 단축 효과가 있습니다. 풀 크기 설정이 중요합니다.",
  },
];
