class FruitImagesController < ApplicationController

  def create
    binding.pry
    upload = params[:upload]

    if params[:fruit_id]
      # attaching to product that already exists
      @fruit = Fruit.find(params[:fruit_id])
      @image = @fruit.images.create!(uuid: UUID.new.generate)
    else
      @image = Image.create!(uuid: UUID.new.generate, path: params[:file].tempfile.path)
    end

    render json: { file: @image }
  end
end
