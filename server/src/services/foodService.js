const supabase = require('../config/supabase');

class FoodService {
  async getCategories() {
    const { data, error } = await supabase.from('categories').select('*').order('id');
    if (error) throw new Error(error.message);
    return data;
  }

  async getPopularItems() {
    const { data, error } = await supabase.from('food_items').select('*').eq('is_popular', true).limit(10);
    if (error) throw new Error(error.message);
    return data;
  }

  async getAllFood() {
    const { data, error } = await supabase.from('food_items').select('*');
    if (error) throw new Error(error.message);
    return data;
  }

  async getFoodByCategory(categoryId) {
    const { data, error } = await supabase.from('food_items').select('*').eq('category_id', categoryId);
    if (error) throw new Error(error.message);
    return data;
  }

  async getFoodById(id) {
    const { data, error } = await supabase.from('food_items').select('*').eq('id', id).single();
    if (error) throw new Error(error.message);
    return data;
  }

  async searchFood(query) {
    const { data, error } = await supabase.from('food_items').select('*').ilike('name', `%${query}%`);
    if (error) throw new Error(error.message);
    return data;
  }
}

module.exports = new FoodService();
