import React, { useState } from "react";
import "./ProductPage.css";
import BottomNavigation from "./BottomNavigation"; // Adjust the path according to your folder structure


const productImages = [
    "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?w=600&q=60"
];
const videoUrl = "https://www.w3schools.com/html/mov_bbb.mp4";

export default function ProductPage() {
    const [showVideo, setShowVideo] = useState(false);
    const [liked, setLiked] = useState(false);

    // Toggle between image and video when arrow clicked
    const handleArrowClick = () => {
        setShowVideo((prev) => !prev);
    };

    return (
        <>
            <div className="product-grid-page">
                <section className="product-media">
                    <div className="media-slider flex-row">
                        {showVideo ? (
                            <>
                                <button
                                    className="slider-arrow left-arrow"
                                    onClick={handleArrowClick}
                                    aria-label="Back to image"
                                >
                                    ←
                                </button>
                                <div className="media-content">
                                    <video
                                        width="100%"
                                        height="100%"
                                        controls
                                        poster={productImages[0]}
                                        style={{ borderRadius: "20px" }}
                                    >
                                        <source src={videoUrl} type="video/mp4" />
                                    </video>
                                    {/* dots and like button */}
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="media-content">
                                    <img
                                        src={productImages[0]}
                                        alt="Product"
                                        className="main-product-img"
                                    />
                                    {/* dots and like button */}
                                </div>
                                <button
                                    className="slider-arrow right-arrow"
                                    onClick={handleArrowClick}
                                    aria-label="Show video"
                                >
                                    →
                                </button>
                            </>
                        )}
                    </div>



                    <div className="photo-features-row">
                        <button className="feature-btn">View 360&#176;</button>
                        <button className="feature-btn">View in Your Room</button>
                    </div>
                </section>

                <section className="product-info">
                    <h1 className="product-title">EARTHLY DELIGHTS</h1>
                    <div className="product-rating-row">
                        <span className="stars">★★★★★</span>
                        <span className="review-count">4,067 Reviews</span>
                    </div>
                    <p className="product-desc">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                        vulputate libero et velit interdum, ac aliquet odio mattis.
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                        vulputate libero et velit interdum, ac aliquet odio mattis.
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                        vulputate libero et velit interdum, ac aliquet odio mattis.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                        vulputate libero et velit interdum, ac aliquet odio mattis.
                    </p>
                    <div className="seller-row">
                        <img
                            src="https://randomuser.me/api/portraits/women/44.jpg"
                            alt="Seller"
                            className="seller-avatar"
                        />
                        <span>
                            <strong>EARTHLY DELIGHTS</strong> bd65_lje
                        </span>
                    </div>
                </section>
            </div>

            <footer className="buy-section">
                <div className="price-area">
                    <span className="old-price">₹4,799</span>
                    <span className="new-price">₹3,456</span>
                </div>
                <div className="buy-actions-row">
                    <label htmlFor="qty">Qty:</label>
                    <input
                        id="qty"
                        type="number"
                        className="qty-input"
                        value={1}
                        min={1}
                        max={10}
                        readOnly
                    />
                    <button className="cart-btn" disabled>
                        Add to cart
                    </button>
                </div>
                <button className="buy-btn">Buy Now</button>
            </footer>{/* Add BottomNavigation here */}
            
        </>

        
    );
}

