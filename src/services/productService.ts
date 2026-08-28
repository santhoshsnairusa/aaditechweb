import { Product, ProductRepository } from '../types/product';
import productsData from '../data/products.json';

class LocalProductRepository implements ProductRepository {
    private products: Product[];

    constructor() {
        this.products = productsData as Product[];
    }

    async getProducts(): Promise<Product[]> {
        return this.products;
    }

    async getProductBySlug(slug: string): Promise<Product | null> {
        const product = this.products.find(p => p.slug === slug);
        return product || null;
    }

    async getProductsByCategory(category: string): Promise<Product[]> {
        return this.products.filter(p => p.category === category);
    }

    async getFeaturedProducts(): Promise<Product[]> {
        return this.products.filter(p => p.featured);
    }

    async getCategories(): Promise<string[]> {
        const categories = new Set(this.products.map(p => p.category));
        return Array.from(categories);
    }
}

export const productService = new LocalProductRepository();
