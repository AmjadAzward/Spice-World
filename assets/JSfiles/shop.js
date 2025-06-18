document.addEventListener("DOMContentLoaded", () => {
    createModalStructure();

    // Fetch product data from the server
    fetch('User-products.php')
        .then(response => response.json())
        .then(products => {
            const list = document.getElementById('product-list');
            const categoryDescriptionDiv = document.getElementById('category-description'); // Add this to your HTML
            list.innerHTML = "";

            // Function to filter products based on category
            function filterProducts(category) {
                let filteredProducts;
                let categoryDescription = "";

                // If category is "*" or "all", display all products
                if (category === "all" || category === "*") {
                    filteredProducts = products; // No filtering, show all
                    
                } else {
                    // Filter products by category
                    filteredProducts = products.filter(product => 
                        product.category.toLowerCase() === category.toLowerCase()
                    );

                    // Find the description for the selected category
                    categoryDescription = getCategoryDescription(category);
                }

                displayProducts(filteredProducts);
                categoryDescriptionDiv.innerHTML = categoryDescription; // Display category description
            }

            // Function to display products on the page
            function displayProducts(productsToDisplay) {
                list.innerHTML = "";  // Clear existing products
                productsToDisplay.forEach(product => {
                    const card = document.createElement('div');
                    card.className = `product-card ${product.category.toLowerCase()}`;

                    const hasSecondImage = product.image2 && product.image2.trim() !== "";

                    card.innerHTML = `
                        <div class="image-wrapper ${hasSecondImage ? 'hover-effect' : ''}">
                            <img src="${product.image}" alt="${product.name}" class="product-image default-img">
                            ${hasSecondImage ? `<img src="${product.image2}" alt="${product.name}" class="product-image hover-img">` : ''}
                        </div>
                        <p class="product-name">${product.name}<p>
                        <p class="product-category">Category: ${product.category}</p>
                        <p class="product-price">Price: Rs ${Number(product.price).toFixed(2)}</p>
                        <p class="product-stock">In stock: ${product.stock} kg</p>
                        <button class="card-inquire-btn" onclick="window.location.href='contact.html'; event.stopPropagation();">Inquire</button>
                    `;

                    card.addEventListener("click", () => openModal(product));
                    list.appendChild(card);
                });
            }

            // Function to get category description
const categoryDescriptions = {
  cinnamon: `
    <div class="product-description">
      <h2>Cinnamon</h2>
      <p><span class="highlight">Ceylon Cinnamon</span>, often referred to as "True Cinnamon," originates from the bark of the <span class="highlight">Cinnamomum verum</span> tree native to Sri Lanka. It is highly valued around the world for its delicate flavor, sweet aroma, and impressive health-promoting properties. Compared to common Cassia cinnamon, <span class="highlight">Ceylon Cinnamon</span> contains ultra-low levels of coumarin, making it safer for daily use. This spice is a must-have for gourmet chefs, wellness advocates, and anyone looking to enhance their culinary and wellness routines.</p>
      <p>The soft, crumbly bark of <span class="highlight">Ceylon Cinnamon</span> rolls into tight quills that are easily ground into a fine powder. Its subtle yet complex flavor is perfect for baked goods, beverages like chai and golden milk, savory dishes such as curries and stews, and even cosmetic formulations and herbal remedies. Rich in antioxidants and anti-inflammatory agents, this spice is not just flavorful but incredibly functional as well.</p>
      <ul>
        <li><span class="highlight">Premium Quality:</span> Sourced from Sri Lankan farms with traditional harvesting methods.</li>
        <li><span class="highlight">Versatile Use:</span> Excellent in baking, spice blends, curries, teas, and wellness recipes.</li>
        <li><span class="highlight">Health Benefits:</span> Helps regulate blood sugar levels, reduce inflammation, and support digestion.</li>
        <li><span class="highlight">Form Options:</span> Available in sticks, powder, and capsule formats for diverse applications.</li>
        <li><span class="highlight">Storage Friendly:</span> Comes in moisture-proof, resealable packaging to maintain freshness.</li>
      </ul>
      <h3>Why Choose Our Cinnamon?</h3>
      <p>Our cinnamon is hand-selected, sun-dried, and minimally processed to retain its full nutrient profile and flavor. We are committed to ethical sourcing and fair-trade practices, ensuring that every purchase contributes to sustainable agriculture and supports Sri Lankan farming communities.</p>
      <p>Our clients include health-conscious consumers, organic retailers, bakers, chefs, and holistic product formulators. Join thousands who trust our <span class="highlight">Ceylon Cinnamon</span> for its taste, aroma, and wellness value.</p>
      <h3>Storage Tips:</h3>
      <p>Store in an airtight container in a cool, dark place. Avoid direct exposure to sunlight or humidity to preserve its natural oils and effectiveness.</p>
      <h3>Order Now</h3>
      <p>Bring the magic of authentic <span class="highlight">Ceylon Cinnamon</span> to your kitchen and wellness shelf. Fast global shipping, bulk and retail options available, and customer satisfaction guaranteed.</p>
    </div>
  `,

  nutmeg: `
    <div class="product-description">
      <h2>Nutmeg</h2>
      <p><span class="highlight">Nutmeg</span>, the aromatic seed from the <span class="highlight">Myristica fragrans</span> tree, is cherished for its rich, nutty flavor and potent medicinal qualities. Native to the Banda Islands in Indonesia and widely cultivated in Sri Lanka and the Caribbean, <span class="highlight">nutmeg</span> is used globally in sweet and savory recipes, beverages, and wellness applications. It’s a spice of both culinary charm and traditional healing significance.</p>
      <p>This flavorful spice is often grated or ground to elevate dishes such as pies, custards, curries, pasta sauces, and beverages like eggnog and chai. <span class="highlight">Nutmeg</span> also plays a vital role in skincare and natural remedies due to its antibacterial, anti-inflammatory, and calming properties.</p>
      <ul>
        <li><span class="highlight">Exceptional Aroma:</span> Distinct warm and sweet scent that enhances food and drinks.</li>
        <li><span class="highlight">Health-Boosting:</span> Supports digestion, relieves pain, improves sleep, and enhances skin health.</li>
        <li><span class="highlight">Versatile Ingredient:</span> Used in bakery, gourmet cooking, spice mixes, and health tonics.</li>
        <li><span class="highlight">High-Grade Quality:</span> Handpicked and naturally sun-dried to retain essential oils and potency.</li>
        <li><span class="highlight">Packaging:</span> Airtight containers to preserve freshness and flavor.</li>
      </ul>
      <h3>Why Choose Our Nutmeg?</h3>
      <p>Our <span class="highlight">nutmeg</span> is ethically sourced from sustainable farms, processed with minimal intervention to ensure quality and safety. Every batch undergoes quality checks for freshness, purity, and oil content.</p>
      <p>It’s a favorite among chefs, wellness seekers, natural beauty formulators, and health-conscious households. Add this multifaceted spice to your lifestyle today.</p>
      <h3>Storage Tips:</h3>
      <p>Store in a cool, dry place in sealed containers. Grate fresh as needed to maximize aroma and taste.</p>
      <h3>Buy Now</h3>
      <p>Order premium <span class="highlight">nutmeg</span> today and enjoy fast delivery and flexible quantity options. Great for personal use, retail, or wholesale buyers.</p>
    </div>
  `,

  pepper: `
    <div class="product-description">
      <h2>Pepper</h2>
      <p><span class="highlight">Black Pepper</span>, the "King of Spices," is a bold and versatile spice derived from dried berries of the <span class="highlight">Piper nigrum</span> vine. Grown predominantly in tropical climates like Sri Lanka and India, this spice is a cornerstone of global cuisine and traditional healing systems. Its sharp, pungent flavor enhances nearly every savory dish while contributing powerful antioxidant and digestive benefits.</p>
      <p>Our <span class="highlight">black pepper</span> is sun-ripened and minimally processed to preserve essential oils and full-bodied flavor. It can be used whole, crushed, or ground, and pairs beautifully with meats, vegetables, soups, and marinades. <span class="highlight">Black Pepper</span> also enhances the absorption of nutrients like curcumin from turmeric.</p>
      <ul>
        <li><span class="highlight">Intense Flavor:</span> Delivers strong, spicy taste with complex undertones.</li>
        <li><span class="highlight">Health Properties:</span> Aids digestion, improves metabolism, and boosts nutrient absorption.</li>
        <li><span class="highlight">Quality Assurance:</span> Steam-sterilized and lab-tested for purity and oil content.</li>
        <li><span class="highlight">Applications:</span> Used in cooking, spice blends, herbal medicines, and essential oils.</li>
        <li><span class="highlight">Packaging:</span> Resealable, UV-resistant bags or jars for long-lasting freshness.</li>
      </ul>
      <h3>Why Buy Our Black Pepper?</h3>
      <p>Sustainably harvested and processed to international standards, our pepper meets the needs of gourmet chefs, home cooks, and health product manufacturers alike. Its superior aroma and heat are testaments to its quality.</p>
      <p>Our products support eco-friendly farming practices and fair wages for local farmers.</p>
      <h3>Storage Instructions:</h3>
      <p>Keep in a sealed container away from moisture and direct light. Grind fresh for maximum flavor.</p>
      <h3>Order Today</h3>
      <p>Spice up your kitchen or product line with our premium <span class="highlight">black pepper</span>. Available in retail packs and bulk quantities.</p>
    </div>
  `,

  cloves: `
    <div class="product-description">
      <h2>Cloves</h2>
      <p><span class="highlight">Cloves</span> are dried flower buds of the <span class="highlight">Syzygium aromaticum</span> tree, offering a potent blend of sweetness and warmth with deep, earthy undertones. Native to Indonesia and now widely cultivated in Sri Lanka, <span class="highlight">cloves</span> are widely used in cooking, traditional medicine, aromatherapy, and personal care products.</p>
      <p>Whole or ground, <span class="highlight">cloves</span> impart a rich flavor to curries, baked goods, stews, teas, and mulled drinks. With high antioxidant content and antiseptic properties, they also aid in digestive health and oral hygiene. <span class="highlight">Cloves</span> are an ancient remedy for toothaches and are still included in modern natural toothpaste and mouthwash.</p>
      <ul>
        <li><span class="highlight">Strong Aroma:</span> Distinct scent ideal for culinary and therapeutic use.</li>
        <li><span class="highlight">Medicinal Value:</span> Contains eugenol for pain relief, antimicrobial, and anti-inflammatory benefits.</li>
        <li><span class="highlight">Flexible Usage:</span> Ideal for spiced drinks, desserts, savory dishes, and herbal infusions.</li>
        <li><span class="highlight">Careful Processing:</span> Hand-picked and sun-dried to preserve flavor and quality.</li>
        <li><span class="highlight">Eco Packaging:</span> Sustainable materials used for freshness and environmental care.</li>
      </ul>
      <h3>Why Buy Our Cloves?</h3>
      <p>We deliver 100% natural <span class="highlight">cloves</span> directly from responsible plantations. Our <span class="highlight">cloves</span> undergo strict quality checks to ensure they are aromatic, fresh, and pesticide-free. Trusted by chefs, wellness companies, and herbalists around the world.</p>
      <h3>Best Storage:</h3>
      <p>Store in sealed glass jars in cool, dry areas to maintain oil content and aroma.</p>
      <h3>Place Your Order</h3>
      <p>Enhance your kitchen and wellness with top-grade <span class="highlight">cloves</span>. Available in various sizes for consumers and businesses.</p>
    </div>
  `,

   maize: `
    <div class="product-description">
      <h2>Maize</h2>
      <p><span class="highlight">Maize</span>, also known as <span class="highlight">corn</span>, is one of the most versatile crops in the world. Native to the Americas, it is a staple food in many cultures and widely used in a variety of culinary applications, from savory dishes to sweet treats. <span class="highlight">Maize</span> is rich in carbohydrates, providing a valuable source of energy, and is also packed with essential vitamins and minerals.</p>
      <p>Whether consumed as a whole grain, in the form of flour, or ground into cornmeal, <span class="highlight">maize</span> is the key ingredient in foods like tortillas, cornbread, and popcorn. It’s also used as animal feed and in the production of biofuels, showcasing its global economic and agricultural significance.</p>
      <ul>
        <li><span class="highlight">Nutrient-Rich:</span> A great source of carbohydrates, fiber, and B-vitamins.</li>
        <li><span class="highlight">Culinary Uses:</span> Used in baking, boiling, and grinding into flour or meal.</li>
        <li><span class="highlight">Versatile Product:</span> Found in tortillas, popcorn, cereals, and more.</li>
        <li><span class="highlight">Sustainable Crop:</span> Grown in diverse climates, supporting agricultural economies.</li>
        <li><span class="highlight">Long Shelf Life:</span> Proper storage ensures the grain maintains quality for longer periods.</li>
      </ul>
      <h3>Why Choose Our Maize?</h3>
      <p>Our <span class="highlight">organic maize</span> is grown without the use of harmful pesticides or fertilizers, ensuring you receive the highest quality grains. Whether for food, livestock, or industrial use, our maize is processed with care to maintain freshness, taste, and nutritional value.</p>
      <h3>Storage Tips:</h3>
      <p>Store <span class="highlight">maize</span> in a cool, dry, and airtight container to maintain its freshness and prevent moisture absorption.</p>
      <h3>Order Now</h3>
      <p>Bring this all-natural, versatile product into your pantry or business today! Available in bulk and retail quantities.</p>
    </div>
  `,

  cardamom: `
    <div class="product-description">
      <h2>Cardamom</h2>
      <p><span class="highlight">Cardamom</span>, often referred to as the "queen of spices," is a highly aromatic spice derived from the seeds of the <span class="highlight">Elettaria cardamomum</span> plant, native to India and Sri Lanka. Known for its sweet, slightly spicy flavor, <span class="highlight">cardamom</span> is a key ingredient in a variety of culinary and medicinal applications.</p>
      <p>This versatile spice is used in both sweet and savory dishes, ranging from Indian curries and Middle Eastern pastries to Scandinavian baked goods and warm beverages like chai and coffee. Beyond its culinary appeal, <span class="highlight">cardamom</span> is also valued for its therapeutic benefits, known for its ability to soothe the digestive system, freshen breath, and support oral health.</p>
      <ul>
        <li><span class="highlight">Rich Flavor:</span> Sweet, spicy, and floral with a distinctive fragrance.</li>
        <li><span class="highlight">Health Benefits:</span> Aids digestion, freshens breath, and relieves nausea.</li>
        <li><span class="highlight">Aromatic Experience:</span> Adds depth to both sweet and savory dishes, as well as beverages.</li>
        <li><span class="highlight">Carefully Sourced:</span> Hand-harvested and sun-dried to preserve essential oils.</li>
        <li><span class="highlight">Multiple Forms:</span> Available in whole pods, seeds, or ground powder.</li>
      </ul>
      <h3>Why Buy Our Cardamom?</h3>
      <p>Our <span class="highlight">cardamom</span> is grown in ideal climates, ensuring that the spice retains its robust aroma and flavor profile. We work directly with farmers to ensure fair trade and eco-friendly cultivation practices, providing a product that is as ethical as it is flavorful.</p>
      <h3>Storage Recommendations:</h3>
      <p>Store whole <span class="highlight">cardamom</span> pods in an airtight container in a cool, dark place. For ground cardamom, keep it sealed in a container to preserve freshness.</p>
      <h3>Order Now</h3>
      <p>Add our premium <span class="highlight">cardamom</span> to your kitchen or wellness products. Available in bulk and retail packaging.</p>
    </div>
  `,

  coconut: `
    <div class="product-description">
      <h2>Coconut</h2>
      <p><span class="highlight">Coconut</span> is a tropical fruit known for its versatility in both culinary and non-culinary applications. The coconut tree, <span class="highlight">Cocos nucifera</span>, has been revered for centuries for its numerous uses, from the edible coconut meat to coconut oil, milk, and water. Packed with healthy fats, vitamins, and minerals, <span class="highlight">coconut</span> is a staple in many diets around the world.</p>
      <p>Whether you’re enjoying a refreshing glass of coconut water, using coconut oil for cooking or skincare, or incorporating dried coconut into your favorite recipes, this fruit is a powerhouse of nutrients and health benefits. It is also an excellent source of medium-chain triglycerides (MCTs), which are known for promoting energy and supporting metabolism.</p>
      <ul>
        <li><span class="highlight">Nutritious Benefits:</span> Rich in fiber, MCTs, and essential nutrients.</li>
        <li><span class="highlight">Versatile Usage:</span> Enjoy in beverages, desserts, cooking, and skincare.</li>
        <li><span class="highlight">Sustainability:</span> Minimal waste, with every part of the coconut having a use.</li>
        <li><span class="highlight">Cold-Pressed Oil:</span> For maximum health benefits, our coconut oil is cold-pressed.</li>
        <li><span class="highlight">Freshness Guaranteed:</span> Hand-harvested and processed with care to ensure quality.</li>
      </ul>
      <h3>Why Choose Our Coconut?</h3>
      <p>We source our <span class="highlight">coconuts</span> from organic farms committed to sustainable practices. Our products are processed without artificial additives, ensuring you receive only the purest coconut in its many forms.</p>
      <h3>Storage Tips:</h3>
      <p>Keep coconut oil and dried coconut products in a cool, dry place. For fresh coconut, refrigerate it in a sealed container to maintain freshness.</p>
      <h3>Order Now</h3>
      <p>Explore the endless benefits of coconut and order now. Available in various forms including water, oil, and dried coconut.</p>
    </div>
  `,

  beetlenut: `
    <div class="product-description">
      <h2>Betel Nut</h2>
      <p><span class="highlight">Betel Nut</span>, also known as areca nut, is the seed of the <span class="highlight">Areca catechu</span> palm, grown primarily in tropical regions of Asia and the Pacific Islands. The nut has been used for thousands of years as a stimulant and in traditional rituals and medicine. Betel nut is typically chewed with betel leaves, often accompanied by lime, and is widely consumed in many cultures, particularly in Southeast Asia.</p>
      <p>The nut contains alkaloids such as arecoline, which has a stimulating effect on the body and mind. It’s traditionally used to increase alertness, improve digestion, and as a mild euphoric. It is also used in traditional oral hygiene practices, with the combination of betel leaf and betel nut serving as a natural mouth freshener and antibacterial agent.</p>
      <ul>
        <li><span class="highlight">Traditional Use:</span> Widely consumed in cultural and ceremonial practices.</li>
        <li><span class="highlight">Stimulant Effects:</span> Provides a mild stimulant effect when chewed, promoting alertness.</li>
        <li><span class="highlight">Medicinal Benefits:</span> Aids digestion and is sometimes used in natural treatments for oral health.</li>
        <li><span class="highlight">Cultural Significance:</span> Integral part of many traditional practices and rituals.</li>
        <li><span class="highlight">Sustainably Sourced:</span> Hand-harvested from organic plantations in tropical regions.</li>
      </ul>
      <h3>Why Choose Our Betel Nut?</h3>
      <p>Our <span class="highlight">betel nuts</span> are sourced from high-quality plantations that adhere to sustainable farming practices. The nuts are carefully processed to retain their natural properties while ensuring quality and safety.</p>
      <h3>Storage Instructions:</h3>
      <p>Store betel nuts in a cool, dry place to maintain their potency and freshness.</p>
      <h3>Order Now</h3>
      <p>Purchase premium <span class="highlight">betel nuts</span> for your cultural, medicinal, or personal use. Available in bulk and retail packaging.</p>
    </div>
  `
};



            function getCategoryDescription(category) {
                return categoryDescriptions[category.toLowerCase()] || "No description available for this category.";
            }
            

            // Initially display all products
            filterProducts("all");

            // Filter products based on the selected category from the filters
            const filterItems = document.querySelectorAll(".product-filters ul li");

            filterItems.forEach(item => {
                item.addEventListener("click", function() {
                    const category = item.getAttribute("data-filter").substring(1).toLowerCase(); // Remove '.' and convert to lowercase
                    filterItems.forEach(filter => filter.classList.remove("active"));
                    item.classList.add("active");

                    const cat = document.getElementById("cat");
                    // If "All" category is selected, display all products
                    if (cat.classList.contains("active")) {
                        filterProducts("all");
                        
                    } else {
                        filterProducts(category);  // Display filtered products
                    }
                });
            });
        })
        .catch(error => {
            console.error('Error fetching products:', error);
        });
});

function createModalStructure() {
    const modal = document.createElement('div');
    modal.id = 'product-modal';
    modal.className = 'modal';
    modal.style.display = 'none';

    modal.innerHTML = `
        <div class="modal-content" id="modal-content">
            <span id="modal-close" class="close-btn">&times;</span>
            <div class="modal-image-container" id="modal-slides"></div>
            <button class="slide-btn left" onclick="changeSlide(-1)">&#10094;</button>
            <button class="slide-btn right" onclick="changeSlide(1)">&#10095;</button>
            <div class="modal-details">
                <h2 id="modal-name"></h2>
                <p id="modal-category"></p>
                <p id="modal-price"></p>
                <p id="modal-stock"></p>
                <button id="modal-inquire" class="modal-inquire-btn">Inquire</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    // Close handlers
    document.getElementById("modal-close").onclick = () => closeModal();
    modal.onclick = (e) => {
        if (e.target === modal) closeModal();
    };

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
        const modalVisible = document.getElementById("product-modal").style.display === "flex";
        if (!modalVisible) return;

        if (e.key === "ArrowLeft") changeSlide(-1);
        else if (e.key === "ArrowRight") changeSlide(1);
        else if (e.key === "Escape") closeModal();
    });

    // Touch swipe support
    const slidesContainer = document.getElementById('modal-slides');
    let startX = 0;
    slidesContainer.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });
    slidesContainer.addEventListener('touchend', (e) => {
        const endX = e.changedTouches[0].clientX;
        const diff = startX - endX;
        if (Math.abs(diff) > 50) {
            changeSlide(diff > 0 ? 1 : -1);
        }
    });
}

let currentSlide = 0;

function openModal(product) {
    const modal = document.getElementById("product-modal");
    const slidesContainer = document.getElementById("modal-slides");

    document.getElementById("modal-name").textContent = product.name;
    document.getElementById("modal-category").textContent = `Category: ${product.category}`;
    document.getElementById("modal-price").textContent = `Price: Rs ${Number(product.price).toFixed(2)}`;
    document.getElementById("modal-stock").textContent = `In Stock: ${product.stock} kg `;
    document.getElementById("modal-inquire").onclick = () => window.location.href = 'contact.html';

    slidesContainer.innerHTML = '';
    const images = [product.image];
    if (product.image2 && product.image2.trim() !== '') images.push(product.image2);

    images.forEach((imgSrc, i) => {
        const img = document.createElement('img');
        img.src = imgSrc;
        img.className = 'modal-slide';
        img.style.display = i === 0 ? 'block' : 'none';
        slidesContainer.appendChild(img);
    });

    currentSlide = 0;
    modal.style.display = 'flex';
}

function changeSlide(step) {
    const slides = document.querySelectorAll('.modal-slide');
    if (slides.length < 2) return;

    slides[currentSlide].style.display = 'none';
    currentSlide = (currentSlide + step + slides.length) % slides.length;
    slides[currentSlide].style.display = 'block';
}

function closeModal() {
    document.getElementById("product-modal").style.display = "none";
}
