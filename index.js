window.onload = () => {
	let score = 0;
	let selectionAllowed = true;

	const scoreHeader = document.querySelector("h2");
	const cardsContainer = document.querySelector(".cards_container");

	const createCard = (name) => {
		const card = document.createElement("div");
		card.classList.add("card");

		const selectCard = (name) => {
			return () => {
				if (selectionAllowed) {
					card.classList.add("selected");
					card.innerText = name;
					flip(card);
				}
			};
		};

		card.addEventListener("click", selectCard(name));
		return card;
	};

	const turnOver = (card) => {
		card.innerText = "";
		card.classList.remove("selected");
		selectionAllowed = true;
	};

	const flip = (() => {
		let check = function first(c1) {
			function second(c2) {
				return c1 == c2 ? second : (match(c1, c2), first);
			}
			return second;
		};
		return (card) => (check = check(card));
	})();

	const match = (c1, c2) => {
		selectionAllowed = false;
		if (c1.innerText == c2.innerText) {
			score += 1;
			selectionAllowed = true;
		} else {
			score <= 0 ? (score = 0) : (score -= 1);
			setTimeout(() => (turnOver(c1), turnOver(c2)), 1500);
		}
		updateScore(score, scoreHeader);
	};

	const updateScore = (score, elem) => {
		elem.innerText = "Score: " + score;
	};

	(() => {
		const scramble = (l) => l.concat(l).sort(() => 0.5 - Math.random());
		const emojis = [
			String.fromCodePoint(0x1f639), // 😹
			String.fromCodePoint(0x1f385), // 🎅
			String.fromCodePoint(0x1f606), // 😆
			String.fromCodePoint(0x1f601), // 😁
			String.fromCodePoint(0x1f4a9), // 💩
			String.fromCodePoint(0x1f649), // 🙉
			String.fromCodePoint(0x1f602), // 😂
			String.fromCodePoint(0x1f921), // 🤡
			String.fromCodePoint(0x1f479), // 👹
			String.fromCodePoint(0x1f61d), // 😝
		];
		const cards = scramble(emojis).map((e) => createCard(e));
		cardsContainer.append(...cards);
	})();
};
