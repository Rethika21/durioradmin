import React, { useState, useEffect } from "react";
import { FaPlus, FaSearch, FaEdit, FaTrash, FaEye, FaUser, FaBox } from "react-icons/fa";
import TopNav from "../components/TopNav";
import "./SalesManagement.css";

// Sample data
const sampleProducts = [
  { id: 1, name: "Brake Pads", category: "Brakes", price: 45.99, stock: 50 },
  { id: 2, name: "Oil Filter", category: "Engine", price: 12.99, stock: 100 },
  { id: 3, name: "Air Filter", category: "Engine", price: 18.99, stock: 75 },
  { id: 4, name: "Spark Plugs", category: "Engine", price: 8.99, stock: 200 },
  { id: 5, name: "Battery", category: "Electrical", price: 89.99, stock: 25 },
  { id: 6, name: "Tire", category: "Wheels", price: 120.99, stock: 30 },
];

const sampleCustomers = [
  { id: 1, name: "John Smith", email: "john@email.com", phone: "+1-555-0123", totalSpent: 2500 },
  { id: 2, name: "Sarah Johnson", email: "sarah@email.com", phone: "+1-555-0124", totalSpent: 1800 },
  { id: 3, name: "Mike Wilson", email: "mike@email.com", phone: "+1-555-0125", totalSpent: 1200 },
];

const sampleSales = [
  { id: 1, customer: "John Smith", products: ["Brake Pads", "Oil Filter"], total: 58.98, date: "2024-01-15", status: "Completed" },
  { id: 2, customer: "Sarah Johnson", products: ["Air Filter"], total: 18.99, date: "2024-01-15", status: "Pending" },
  { id: 3, customer: "Mike Wilson", products: ["Spark Plugs", "Battery"], total: 98.98, date: "2024-01-14", status: "Completed" },
];

const SalesManagement = () => {
  const [activeTab, setActiveTab] = useState('new-sale');
  const [activeLink, setActiveLink] = useState("Sales Management");
  const [products, setProducts] = useState(sampleProducts);
  const [customers, setCustomers] = useState(sampleCustomers);
  const [sales, setSales] = useState(sampleSales);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showAddCustomer, setShowAddCustomer] = useState(false);

  // New sale form state
  const [newSale, setNewSale] = useState({
    customer: '',
    products: [],
    total: 0
  });

  // New product form state
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    price: '',
    stock: ''
  });

  // New customer form state
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const categories = ['all', ...new Set(products.map(p => p.category))];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addProductToSale = (product) => {
    setNewSale(prev => ({
      ...prev,
      products: [...prev.products, product],
      total: prev.total + product.price
    }));
  };

  const removeProductFromSale = (productId) => {
    const product = newSale.products.find(p => p.id === productId);
    setNewSale(prev => ({
      ...prev,
      products: prev.products.filter(p => p.id !== productId),
      total: prev.total - product.price
    }));
  };

  const handleNewSaleSubmit = (e) => {
    e.preventDefault();
    if (newSale.customer && newSale.products.length > 0) {
      const sale = {
        id: sales.length + 1,
        customer: newSale.customer,
        products: newSale.products.map(p => p.name),
        total: newSale.total,
        date: new Date().toISOString().split('T')[0],
        status: 'Pending'
      };
      setSales([sale, ...sales]);
      setNewSale({ customer: '', products: [], total: 0 });
    }
  };

  const handleNewProductSubmit = (e) => {
    e.preventDefault();
    const product = {
      id: products.length + 1,
      name: newProduct.name,
      category: newProduct.category,
      price: parseFloat(newProduct.price),
      stock: parseInt(newProduct.stock)
    };
    setProducts([...products, product]);
    setNewProduct({ name: '', category: '', price: '', stock: '' });
    setShowAddProduct(false);
  };

  const handleNewCustomerSubmit = (e) => {
    e.preventDefault();
    const customer = {
      id: customers.length + 1,
      name: newCustomer.name,
      email: newCustomer.email,
      phone: newCustomer.phone,
      totalSpent: 0
    };
    setCustomers([...customers, customer]);
    setNewCustomer({ name: '', email: '', phone: '' });
    setShowAddCustomer(false);
  };

  return (
    <div className="sales-management-container" style={{ fontFamily: 'Inter, sans-serif' }}>
      <TopNav activeLink={activeLink} setActiveLink={setActiveLink} />
      <div className="sales-management-header">
        <h1>Sales Management</h1>
        <p>Manage sales, customers, and products</p>
      </div>
      {/* Tab Navigation */}
      <div className="sales-tabs">
        <button 
          className={`tab-button ${activeTab === 'new-sale' ? 'active' : ''}`}
          onClick={() => setActiveTab('new-sale')}
        >
          <FaPlus /> New Sale
        </button>
        <button 
          className={`tab-button ${activeTab === 'sales-history' ? 'active' : ''}`}
          onClick={() => setActiveTab('sales-history')}
        >
          <FaEye /> Sales History
        </button>
        <button 
          className={`tab-button ${activeTab === 'customers' ? 'active' : ''}`}
          onClick={() => setActiveTab('customers')}
        >
          <FaUser /> Customers
        </button>
        <button 
          className={`tab-button ${activeTab === 'products' ? 'active' : ''}`}
          onClick={() => setActiveTab('products')}
        >
          <FaBox /> Products
        </button>
      </div>
      {/* Tab Content */}
      <div className="tab-content">
        {/* New Sale Tab */}
        {activeTab === 'new-sale' && (
          <div className="new-sale-section">
            <div className="sale-form-container">
              <h3>Create New Sale</h3>
              <form onSubmit={handleNewSaleSubmit} className="sale-form">
                <div className="form-group">
                  <label>Customer</label>
                  <select 
                    value={newSale.customer} 
                    onChange={(e) => setNewSale({...newSale, customer: e.target.value})}
                    required
                  >
                    <option value="">Select Customer</option>
                    {customers.map(customer => (
                      <option key={customer.id} value={customer.name}>{customer.name}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Products</label>
                  <div className="selected-products">
                    {newSale.products.map(product => (
                      <div key={product.id} className="selected-product">
                        <span>{product.name}</span>
                        <span>${product.price}</span>
                        <button 
                          type="button" 
                          onClick={() => removeProductFromSale(product.id)}
                          className="remove-product"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="form-group">
                  <label>Total: ${newSale.total.toFixed(2)}</label>
                </div>
                <button type="submit" className="submit-btn" disabled={!newSale.customer || newSale.products.length === 0}>
                  Create Sale
                </button>
              </form>
            </div>
            <div className="product-catalog">
              <h3>Product Catalog</h3>
              <div className="product-grid">
                {products.map(product => (
                  <div key={product.id} className="product-card">
                    <div className="product-info">
                      <h4>{product.name}</h4>
                      <p className="product-category">{product.category}</p>
                      <p className="product-price">${product.price}</p>
                      <p className="product-stock">Stock: {product.stock}</p>
                    </div>
                    <button 
                      onClick={() => addProductToSale(product)}
                      className="add-to-sale-btn"
                      disabled={product.stock === 0}
                    >
                      Add to Sale
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        {/* Sales History Tab */}
        {activeTab === 'sales-history' && (
          <div className="sales-history-section">
            <div className="section-header">
              <h3>Sales History</h3>
              <div className="search-filter">
                <input 
                  type="text" 
                  placeholder="Search sales..." 
                  className="search-input"
                />
                <FaSearch className="search-icon" />
              </div>
            </div>
            <div className="sales-table-container">
              <table className="sales-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Customer</th>
                    <th>Products</th>
                    <th>Total</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sales.map(sale => (
                    <tr key={sale.id}>
                      <td>#{sale.id}</td>
                      <td>{sale.customer}</td>
                      <td>{sale.products.join(', ')}</td>
                      <td>${sale.total.toFixed(2)}</td>
                      <td>{sale.date}</td>
                      <td><span className={`status ${sale.status.toLowerCase()}`}>{sale.status}</span></td>
                      <td>
                        <button className="action-btn view-btn"><FaEye /></button>
                        <button className="action-btn edit-btn"><FaEdit /></button>
                        <button className="action-btn delete-btn"><FaTrash /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {/* Customers Tab */}
        {activeTab === 'customers' && (
          <div className="customers-section">
            <div className="section-header">
              <h3>Customer Management</h3>
              <button 
                onClick={() => setShowAddCustomer(true)}
                className="add-btn"
              >
                <FaPlus /> Add Customer
              </button>
            </div>
            <div className="customers-grid">
              {customers.map(customer => (
                <div key={customer.id} className="customer-card">
                  <div className="customer-avatar">
                    <FaUser />
                  </div>
                  <div className="customer-details">
                    <h4>{customer.name}</h4>
                    <p>{customer.email}</p>
                    <p>{customer.phone}</p>
                    <p className="customer-total">Total Spent: ${customer.totalSpent.toLocaleString()}</p>
                  </div>
                  <div className="customer-actions">
                    <button className="action-btn edit-btn"><FaEdit /></button>
                    <button className="action-btn delete-btn"><FaTrash /></button>
                  </div>
                </div>
              ))}
            </div>
            {/* Add Customer Modal */}
            {showAddCustomer && (
              <div className="modal-overlay">
                <div className="modal">
                  <h3>Add New Customer</h3>
                  <form onSubmit={handleNewCustomerSubmit}>
                    <div className="form-group">
                      <label>Name</label>
                      <input 
                        type="text" 
                        value={newCustomer.name}
                        onChange={(e) => setNewCustomer({...newCustomer, name: e.target.value})}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Email</label>
                      <input 
                        type="email" 
                        value={newCustomer.email}
                        onChange={(e) => setNewCustomer({...newCustomer, email: e.target.value})}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Phone</label>
                      <input 
                        type="tel" 
                        value={newCustomer.phone}
                        onChange={(e) => setNewCustomer({...newCustomer, phone: e.target.value})}
                        required
                      />
                    </div>
                    <div className="modal-actions">
                      <button type="submit" className="submit-btn">Add Customer</button>
                      <button type="button" onClick={() => setShowAddCustomer(false)} className="cancel-btn">Cancel</button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}
        {/* Products Tab */}
        {activeTab === 'products' && (
          <div className="products-section">
            <div className="section-header">
              <h3>Product Management</h3>
              <div className="header-actions">
                <div className="search-filter">
                  <input 
                    type="text" 
                    placeholder="Search products..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                  />
                  <FaSearch className="search-icon" />
                </div>
                <select 
                  value={selectedCategory} 
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="category-filter"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </option>
                  ))}
                </select>
                <button 
                  onClick={() => setShowAddProduct(true)}
                  className="add-btn"
                >
                  <FaPlus /> Add Product
                </button>
              </div>
            </div>
            <div className="products-table-container">
              <table className="products-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map(product => (
                    <tr key={product.id}>
                      <td>#{product.id}</td>
                      <td>{product.name}</td>
                      <td>{product.category}</td>
                      <td>${product.price}</td>
                      <td>{product.stock}</td>
                      <td>
                        <button className="action-btn edit-btn"><FaEdit /></button>
                        <button className="action-btn delete-btn"><FaTrash /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Add Product Modal */}
            {showAddProduct && (
              <div className="modal-overlay">
                <div className="modal">
                  <h3>Add New Product</h3>
                  <form onSubmit={handleNewProductSubmit}>
                    <div className="form-group">
                      <label>Name</label>
                      <input 
                        type="text" 
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Category</label>
                      <input 
                        type="text" 
                        value={newProduct.category}
                        onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Price</label>
                      <input 
                        type="number" 
                        step="0.01"
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Stock</label>
                      <input 
                        type="number" 
                        value={newProduct.stock}
                        onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
                        required
                      />
                    </div>
                    <div className="modal-actions">
                      <button type="submit" className="submit-btn">Add Product</button>
                      <button type="button" onClick={() => setShowAddProduct(false)} className="cancel-btn">Cancel</button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SalesManagement; 