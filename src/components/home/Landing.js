import React from 'react'

export default function Landing() {
    return (
        <div>
            <section className="welcome-area">
                <div className="welcome-slides owl-carousel">

                    <div className="single-welcome-slide bg-img bg-overlay" styles={{ backgroundImage:`url(img/bg-img/16.jpg)` }} 
                        data-img-url="img/bg-img/16.jpg">

                        <div className="welcome-content h-100">
                            <div className="container h-100">
                                <div className="row h-100 align-items-center">

                                    <div className="col-12">
                                        <div className="welcome-text text-center">
                                            <h6 data-animation="fadeInLeft" data-delay="200ms">Hotel &amp; Resort</h6>
                                            <h2 data-animation="fadeInLeft" data-delay="500ms">Welcome To Roberto</h2>
                                            <a href="#" className="btn roberto-btn btn-2" data-animation="fadeInLeft" data-delay="800ms">Discover
                                                Now</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="single-welcome-slide bg-img bg-overlay"  styles={{ backgroundImage:`url(img/bg-img/17.jpg)` }} data-img-url="img/bg-img/17.jpg">

                        <div className="welcome-content h-100">
                            <div className="container h-100">
                                <div className="row h-100 align-items-center">

                                    <div className="col-12">
                                        <div className="welcome-text text-center">
                                            <h6 data-animation="fadeInUp" data-delay="200ms">Hotel &amp; Resort</h6>
                                            <h2 data-animation="fadeInUp" data-delay="500ms">Welcome To Roberto</h2>
                                            <a href="#" className="btn roberto-btn btn-2" data-animation="fadeInUp" data-delay="800ms">Discover
                                                Now</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="single-welcome-slide bg-img bg-overlay" styles={{ backgroundImage:`url(img/bg-img/18.jpg)` }} 
                        data-img-url="img/bg-img/18.jpg">

                        <div className="welcome-content h-100">
                            <div className="container h-100">
                                <div className="row h-100 align-items-center">

                                    <div className="col-12">
                                        <div className="welcome-text text-center">
                                            <h6 data-animation="fadeInDown" data-delay="200ms">Hotel &amp; Resort</h6>
                                            <h2 data-animation="fadeInDown" data-delay="500ms">Welcome To Roberto</h2>
                                            <a href="#" className="btn roberto-btn btn-2" data-animation="fadeInDown" data-delay="800ms">Discover
                                                Now</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
