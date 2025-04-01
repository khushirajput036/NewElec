import './style.css'
//import products from "../api/products.json"
import { showProductContainer } from '../homeProductCards.js'







document.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch("./products.json");  
        if (!response.ok) {
            throw new Error('Failed to load JSON file');
        }
        const products = await response.json();
        
    
        if (products) {
            showProductContainer(products);
        } else {
            console.error("Error: Products data is empty.");
        }
    } catch (error) {
        console.error("Error loading products:", error);
    }
}); 