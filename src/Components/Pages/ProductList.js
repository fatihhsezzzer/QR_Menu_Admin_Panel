import React from 'react';


const PageContent = () => {
    return (
        <main className="page-content">
            {/* Breadcrumb */}
            <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
                <div className="breadcrumb-title pe-3">eCommerce</div>
                <div className="ps-3">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb mb-0 p-0">
                            <li className="breadcrumb-item">
                                <a href="javascript:;"><i className="bx bx-home-alt"></i></a>
                            </li>
                            <li className="breadcrumb-item active" aria-current="page">Products</li>
                        </ol>
                    </nav>
                </div>
                <div className="ms-auto">
                    <div className="btn-group">
                        <button type="button" className="btn btn-primary">Settings</button>
                        <button type="button" className="btn btn-primary split-bg-primary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown">
                            <span className="visually-hidden">Toggle Dropdown</span>
                        </button>
                        <div className="dropdown-menu dropdown-menu-right dropdown-menu-lg-end">
                            <a className="dropdown-item" href="javascript:;">Action</a>
                            <a className="dropdown-item" href="javascript:;">Another action</a>
                            <a className="dropdown-item" href="javascript:;">Something else here</a>
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item" href="javascript:;">Separated link</a>
                        </div>
                    </div>
                </div>
            </div>
            {/* End Breadcrumb */}

            <div className="product-count d-flex align-items-center gap-3 gap-lg-4 mb-4 fw-bold flex-wrap font-text1">
                <a href="javascript:;"><span className="me-1">All</span><span className="text-secondary">(88754)</span></a>
                <a href="javascript:;"><span className="me-1">Published</span><span className="text-secondary">(56242)</span></a>
                <a href="javascript:;"><span className="me-1">Drafts</span><span className="text-secondary">(17)</span></a>
                <a href="javascript:;"><span className="me-1">On Discount</span><span className="text-secondary">(88754)</span></a>
            </div>

            <div className="row g-3">
                <div className="col-auto">
                    <div className="position-relative">
                        <input className="form-control px-5" type="search" placeholder="Search Products" />
                        <span className="material-symbols-outlined position-absolute ms-3 translate-middle-y start-0 top-50 fs-5">search</span>
                    </div>
                </div>
                <div className="col-auto flex-grow-1 overflow-auto">
                    <div className="btn-group position-static">
                        <div className="btn-group position-static">
                            <button type="button" className="btn border btn-light dropdown-toggle px-4" data-bs-toggle="dropdown" aria-expanded="false">
                                Category
                            </button>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="javascript:;">Action</a></li>
                                <li><a className="dropdown-item" href="javascript:;">Another action</a></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><a className="dropdown-item" href="javascript:;">Something else here</a></li>
                            </ul>
                        </div>
                        <div className="btn-group position-static">
                            <button type="button" className="btn border btn-light dropdown-toggle px-4" data-bs-toggle="dropdown" aria-expanded="false">
                                Vendor
                            </button>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="javascript:;">Action</a></li>
                                <li><a className="dropdown-item" href="javascript:;">Another action</a></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><a className="dropdown-item" href="javascript:;">Something else here</a></li>
                            </ul>
                        </div>
                        <div className="btn-group position-static">
                            <button type="button" className="btn border btn-light dropdown-toggle px-4" data-bs-toggle="dropdown" aria-expanded="false">
                                Collection
                            </button>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="javascript:;">Action</a></li>
                                <li><a className="dropdown-item" href="javascript:;">Another action</a></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><a className="dropdown-item" href="javascript:;">Something else here</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-auto">
                    <div className="d-flex align-items-center gap-2 justify-content-lg-end">
                        <button className="btn btn-light px-4"><i className="bi bi-box-arrow-right me-2"></i>Export</button>
                        <button className="btn btn-primary px-4"><i className="bi bi-plus-lg me-2"></i>Add Product</button>
                    </div>
                </div>
            </div>
            {/* End Row */}

            <div className="card mt-4">
                <div className="card-body">
                    <div className="product-table">
                        <div className="table-responsive white-space-nowrap">
                            <table className="table align-middle">
                                <thead className="table-light">
                                    <tr>
                                        <th>
                                            <input className="form-check-input" type="checkbox" />
                                        </th>
                                        <th>Product Name</th>
                                        <th>Price</th>
                                        <th>Category</th>
                                        <th>Tags</th>
                                        <th>Rating</th>
                                        <th>Vendor</th>
                                        <th>Date</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <input className="form-check-input" type="checkbox" />
                                        </td>
                                        <td>
                                            <div className="d-flex align-items-center gap-3">
                                                <div className="product-box">
                                                    <img src="assets/images/products/01.webp" alt="" />
                                                </div>
                                                <div className="product-info">
                                                    <a href="javascript:;" className="product-title">Women Pink Floral Printed</a>
                                                    <p className="mb-0 product-category">Category : Fashion</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>$49</td>
                                        <td>Palazzos</td>
                                        <td>
                                            <div className="product-tags">
                                                <a href="javascript:;" className="btn-tags">Jeans</a>
                                                <a href="javascript:;" className="btn-tags">iPhone</a>
                                                <a href="javascript:;" className="btn-tags">Laptops</a>
                                                <a href="javascript:;" className="btn-tags">Mobiles</a>
                                                <a href="javascript:;" className="btn-tags">Wallets</a>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="product-rating">
                                                <i className="bi bi-star-half text-warning me-2"></i><span>4.8</span>
                                            </div>
                                        </td>
                                        <td>
                                            <a href="javascript:;">Michle Shoes England</a>
                                        </td>
                                        <td>Nov 12, 10:45 PM</td>
                                        <td>
                                            <div className="dropdown">
                                                <button className="btn btn-sm btn-light border dropdown-toggle dropdown-toggle-nocaret" type="button" data-bs-toggle="dropdown">
                                                    <i className="bi bi-three-dots"></i>
                                                </button>
                                                <ul className="dropdown-menu">
                                                    <li><a className="dropdown-item" href="#">Action</a></li>
                                                    <li><a className="dropdown-item" href="#">Another action</a></li>
                                                    <li><a className="dropdown-item" href="#">Something else here</a></li>
                                                </ul>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <input className="form-check-input" type="checkbox" />
                                        </td>
                                        <td>
                                            <div className="d-flex align-items-center gap-3">
                                                <div className="product-box">
                                                    <img src="assets/images/products/02.webp" alt="" />
                                                </div>
                                                <div className="product-info">
                                                    <a href="javascript:;" className="product-title">Women Pink Floral Printed</a>
                                                    <p className="mb-0 product-category">Category : Fashion</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>$49</td>
                                        <td>Palazzos</td>
                                        <td>
                                            <div className="product-tags">
                                                <a href="javascript:;" className="btn-tags">Jeans</a>
                                                <a href="javascript:;" className="btn-tags">iPhone</a>
                                                <a href="javascript:;" className="btn-tags">Laptops</a>
                                                <a href="javascript:;" className="btn-tags">Mobiles</a>
                                                <a href="javascript:;" className="btn-tags">Wallets</a>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="product-rating">
                                                <i className="bi bi-star-half text-warning me-2"></i><span>4.8</span>
                                            </div>
                                        </td>
                                        <td>
                                            <a href="javascript:;">Michle Shoes England</a>
                                        </td>
                                        <td>Nov 12, 10:45 PM</td>
                                        <td>
                                            <div className="dropdown">
                                                <button className="btn btn-sm btn-light border dropdown-toggle dropdown-toggle-nocaret" type="button" data-bs-toggle="dropdown">
                                                    <i className="bi bi-three-dots"></i>
                                                </button>
                                                <ul className="dropdown-menu">
                                                    <li><a className="dropdown-item" href="#">Action</a></li>
                                                    <li><a className="dropdown-item" href="#">Another action</a></li>
                                                    <li><a className="dropdown-item" href="#">Something else here</a></li>
                                                </ul>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <input className="form-check-input" type="checkbox" />
                                        </td>
                                        <td>
                                            <div className="d-flex align-items-center gap-3">
                                                <div className="product-box">
                                                    <img src="assets/images/products/03.webp" alt="" />
                                                </div>
                                                <div className="product-info">
                                                    <a href="javascript:;" className="product-title">Women Pink Floral Printed</a>
                                                    <p className="mb-0 product-category">Category : Fashion</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>$49</td>
                                        <td>Palazzos</td>
                                        <td>
                                            <div className="product-tags">
                                                <a href="javascript:;" className="btn-tags">Jeans</a>
                                                <a href="javascript:;" className="btn-tags">iPhone</a>
                                                <a href="javascript:;" className="btn-tags">Laptops</a>
                                                <a href="javascript:;" className="btn-tags">Mobiles</a>
                                                <a href="javascript:;" className="btn-tags">Wallets</a>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="product-rating">
                                                <i className="bi bi-star-half text-warning me-2"></i><span>4.8</span>
                                            </div>
                                        </td>
                                        <td>
                                            <a href="javascript:;">Michle Shoes England</a>
                                        </td>
                                        <td>Nov 12, 10:45 PM</td>
                                        <td>
                                            <div className="dropdown">
                                                <button className="btn btn-sm btn-light border dropdown-toggle dropdown-toggle-nocaret" type="button" data-bs-toggle="dropdown">
                                                    <i className="bi bi-three-dots"></i>
                                                </button>
                                                <ul className="dropdown-menu">
                                                    <li><a className="dropdown-item" href="#">Action</a></li>
                                                    <li><a className="dropdown-item" href="#">Another action</a></li>
                                                    <li><a className="dropdown-item" href="#">Something else here</a></li>
                                                </ul>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <input className="form-check-input" type="checkbox" />
                                        </td>
                                        <td>
                                            <div className="d-flex align-items-center gap-3">
                                                <div className="product-box">
                                                    <img src="assets/images/products/04.webp" alt="" />
                                                </div>
                                                <div className="product-info">
                                                    <a href="javascript:;" className="product-title">Women Pink Floral Printed</a>
                                                    <p className="mb-0 product-category">Category : Fashion</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>$49</td>
                                        <td>Palazzos</td>
                                        <td>
                                            <div className="product-tags">
                                                <a href="javascript:;" className="btn-tags">Jeans</a>
                                                <a href="javascript:;" className="btn-tags">iPhone</a>
                                                <a href="javascript:;" className="btn-tags">Laptops</a>
                                                <a href="javascript:;" className="btn-tags">Mobiles</a>
                                                <a href="javascript:;" className="btn-tags">Wallets</a>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="product-rating">
                                                <i className="bi bi-star-half text-warning me-2"></i><span>4.8</span>
                                            </div>
                                        </td>
                                        <td>
                                            <a href="javascript:;">Michle Shoes England</a>
                                        </td>
                                        <td>Nov 12, 10:45 PM</td>
                                        <td>
                                            <div className="dropdown">
                                                <button className="btn btn-sm btn-light border dropdown-toggle dropdown-toggle-nocaret" type="button" data-bs-toggle="dropdown">
                                                    <i className="bi bi-three-dots"></i>
                                                </button>
                                                <ul className="dropdown-menu">
                                                    <li><a className="dropdown-item" href="#">Action</a></li>
                                                    <li><a className="dropdown-item" href="#">Another action</a></li>
                                                    <li><a className="dropdown-item" href="#">Something else here</a></li>
                                                </ul>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <input className="form-check-input" type="checkbox" />
                                        </td>
                                        <td>
                                            <div className="d-flex align-items-center gap-3">
                                                <div className="product-box">
                                                    <img src="assets/images/products/05.webp" alt="" />
                                                </div>
                                                <div className="product-info">
                                                    <a href="javascript:;" className="product-title">Women Pink Floral Printed</a>
                                                    <p className="mb-0 product-category">Category : Fashion</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>$49</td>
                                        <td>Palazzos</td>
                                        <td>
                                            <div className="product-tags">
                                                <a href="javascript:;" className="btn-tags">Jeans</a>
                                                <a href="javascript:;" className="btn-tags">iPhone</a>
                                                <a href="javascript:;" className="btn-tags">Laptops</a>
                                                <a href="javascript:;" className="btn-tags">Mobiles</a>
                                                <a href="javascript:;" className="btn-tags">Wallets</a>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="product-rating">
                                                <i className="bi bi-star-half text-warning me-2"></i><span>4.8</span>
                                            </div>
                                        </td>
                                        <td>
                                            <a href="javascript:;">Michle Shoes England</a>
                                        </td>
                                        <td>Nov 12, 10:45 PM</td>
                                        <td>
                                            <div className="dropdown">
                                                <button className="btn btn-sm btn-light border dropdown-toggle dropdown-toggle-nocaret" type="button" data-bs-toggle="dropdown">
                                                    <i className="bi bi-three-dots"></i>
                                                </button>
                                                <ul className="dropdown-menu">
                                                    <li><a className="dropdown-item" href="#">Action</a></li>
                                                    <li><a className="dropdown-item" href="#">Another action</a></li>
                                                    <li><a className="dropdown-item" href="#">Something else here</a></li>
                                                </ul>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <input className="form-check-input" type="checkbox" />
                                        </td>
                                        <td>
                                            <div className="d-flex align-items-center gap-3">
                                                <div className="product-box">
                                                    <img src="assets/images/products/06.webp" alt="" />
                                                </div>
                                                <div className="product-info">
                                                    <a href="javascript:;" className="product-title">Women Pink Floral Printed</a>
                                                    <p className="mb-0 product-category">Category : Fashion</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>$49</td>
                                        <td>Palazzos</td>
                                        <td>
                                            <div className="product-tags">
                                                <a href="javascript:;" className="btn-tags">Jeans</a>
                                                <a href="javascript:;" className="btn-tags">iPhone</a>
                                                <a href="javascript:;" className="btn-tags">Laptops</a>
                                                <a href="javascript:;" className="btn-tags">Mobiles</a>
                                                <a href="javascript:;" className="btn-tags">Wallets</a>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="product-rating">
                                                <i className="bi bi-star-half text-warning me-2"></i><span>4.8</span>
                                            </div>
                                        </td>
                                        <td>
                                            <a href="javascript:;">Michle Shoes England</a>
                                        </td>
                                        <td>Nov 12, 10:45 PM</td>
                                        <td>
                                            <div className="dropdown">
                                                <button className="btn btn-sm btn-light border dropdown-toggle dropdown-toggle-nocaret" type="button" data-bs-toggle="dropdown">
                                                    <i className="bi bi-three-dots"></i>
                                                </button>
                                                <ul className="dropdown-menu">
                                                    <li><a className="dropdown-item" href="#">Action</a></li>
                                                    <li><a className="dropdown-item" href="#">Another action</a></li>
                                                    <li><a className="dropdown-item" href="#">Something else here</a></li>
                                                </ul>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <input className="form-check-input" type="checkbox" />
                                        </td>
                                        <td>
                                            <div className="d-flex align-items-center gap-3">
                                                <div className="product-box">
                                                    <img src="assets/images/products/07.webp" alt="" />
                                                </div>
                                                <div className="product-info">
                                                    <a href="javascript:;" className="product-title">Women Pink Floral Printed</a>
                                                    <p className="mb-0 product-category">Category : Fashion</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>$49</td>
                                        <td>Palazzos</td>
                                        <td>
                                            <div className="product-tags">
                                                <a href="javascript:;" className="btn-tags">Jeans</a>
                                                <a href="javascript:;" className="btn-tags">iPhone</a>
                                                <a href="javascript:;" className="btn-tags">Laptops</a>
                                                <a href="javascript:;" className="btn-tags">Mobiles</a>
                                                <a href="javascript:;" className="btn-tags">Wallets</a>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="product-rating">
                                                <i className="bi bi-star-half text-warning me-2"></i><span>4.8</span>
                                            </div>
                                        </td>
                                        <td>
                                            <a href="javascript:;">Michle Shoes England</a>
                                        </td>
                                        <td>Nov 12, 10:45 PM</td>
                                        <td>
                                            <div className="dropdown">
                                                <button className="btn btn-sm btn-light border dropdown-toggle dropdown-toggle-nocaret" type="button" data-bs-toggle="dropdown">
                                                    <i className="bi bi-three-dots"></i>
                                                </button>
                                                <ul className="dropdown-menu">
                                                    <li><a className="dropdown-item" href="#">Action</a></li>
                                                    <li><a className="dropdown-item" href="#">Another action</a></li>
                                                    <li><a className="dropdown-item" href="#">Something else here</a></li>
                                                </ul>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <input className="form-check-input" type="checkbox" />
                                        </td>
                                        <td>
                                            <div className="d-flex align-items-center gap-3">
                                                <div className="product-box">
                                                    <img src="assets/images/products/08.webp" alt="" />
                                                </div>
                                                <div className="product-info">
                                                    <a href="javascript:;" className="product-title">Women Pink Floral Printed</a>
                                                    <p className="mb-0 product-category">Category : Fashion</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>$49</td>
                                        <td>Palazzos</td>
                                        <td>
                                            <div className="product-tags">
                                                <a href="javascript:;" className="btn-tags">Jeans</a>
                                                <a href="javascript:;" className="btn-tags">iPhone</a>
                                                <a href="javascript:;" className="btn-tags">Laptops</a>
                                                <a href="javascript:;" className="btn-tags">Mobiles</a>
                                                <a href="javascript:;" className="btn-tags">Wallets</a>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="product-rating">
                                                <i className="bi bi-star-half text-warning me-2"></i><span>4.8</span>
                                            </div>
                                        </td>
                                        <td>
                                            <a href="javascript:;">Michle Shoes England</a>
                                        </td>
                                        <td>Nov 12, 10:45 PM</td>
                                        <td>
                                            <div className="dropdown">
                                                <button className="btn btn-sm btn-light border dropdown-toggle dropdown-toggle-nocaret" type="button" data-bs-toggle="dropdown">
                                                    <i className="bi bi-three-dots"></i>
                                                </button>
                                                <ul className="dropdown-menu">
                                                    <li><a className="dropdown-item" href="#">Action</a></li>
                                                    <li><a className="dropdown-item" href="#">Another action</a></li>
                                                    <li><a className="dropdown-item" href="#">Something else here</a></li>
                                                </ul>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <input className="form-check-input" type="checkbox" />
                                        </td>
                                        <td>
                                            <div className="d-flex align-items-center gap-3">
                                                <div className="product-box">
                                                    <img src="assets/images/products/09.webp" alt="" />
                                                </div>
                                                <div className="product-info">
                                                    <a href="javascript:;" className="product-title">Women Pink Floral Printed</a>
                                                    <p className="mb-0 product-category">Category : Fashion</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>$49</td>
                                        <td>Palazzos</td>
                                        <td>
                                            <div className="product-tags">
                                                <a href="javascript:;" className="btn-tags">Jeans</a>
                                                <a href="javascript:;" className="btn-tags">iPhone</a>
                                                <a href="javascript:;" className="btn-tags">Laptops</a>
                                                <a href="javascript:;" className="btn-tags">Mobiles</a>
                                                <a href="javascript:;" className="btn-tags">Wallets</a>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="product-rating">
                                                <i className="bi bi-star-half text-warning me-2"></i><span>4.8</span>
                                            </div>
                                        </td>
                                        <td>
                                            <a href="javascript:;">Michle Shoes England</a>
                                        </td>
                                        <td>Nov 12, 10:45 PM</td>
                                        <td>
                                            <div className="dropdown">
                                                <button className="btn btn-sm btn-light border dropdown-toggle dropdown-toggle-nocaret" type="button" data-bs-toggle="dropdown">
                                                    <i className="bi bi-three-dots"></i>
                                                </button>
                                                <ul className="dropdown-menu">
                                                    <li><a className="dropdown-item" href="#">Action</a></li>
                                                    <li><a className="dropdown-item" href="#">Another action</a></li>
                                                    <li><a className="dropdown-item" href="#">Something else here</a></li>
                                                </ul>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default PageContent;
