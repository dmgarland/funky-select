class FruitImagesController < ApplicationController

  def index
    render :json => Image.all.to_json(:only => [:id, :uuid])
  end

  def create
    upload = params[:upload]
    if params[:fruit_id]
      # attaching to product that already exists
      @fruit = Fruit.find(params[:fruit_id])
      @image = @fruit.images.create!(uuid: UUID.new.generate)
    else
      @image = Image.create!(uuid: UUID.new.generate, path: params[:file].tempfile.path)
    end

    # Let's just set some kind of URL to a sample image; this would normally
    # be handled by the host application using Paperclip or Carrierwave.
    @image.url = "/assets/beach.jpg"

    render json: @image.as_json.merge(:url => @image.url)
  end

end
