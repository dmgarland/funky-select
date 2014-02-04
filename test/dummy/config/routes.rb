Dummy::Application.routes.draw do
  resources :fruits
  resources :fruit_images
  match "/admin/products/createSupaImage.js" => "fruit_images#create", as: "supaUpload"
end
