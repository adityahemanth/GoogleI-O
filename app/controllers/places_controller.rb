class PlacesController < ApplicationController

	layout "place"

	def show
		@place = Place.where(:id => params[:id])
	end

	def index
		if current_user
			@user = current_user
		else
			@user = nil
		end

		@places = Place.all
	end

	def within
		latlng = [ params[:lat], params[:lng] ]
		radius = params[:radius]

		if radius == 0
			radius = 5
		end
		@places = Place.within(radius,  :origin => latlng)
		render :json => @places

	end

	def getPhotos
		@photos = Photo.where(:place_id => params[:id])
		render :json => @photos
	end

	def create

	end


	def destroy
	end

	def update
	end

	private
		def place_params
			params.require(:place).permit(:title, :description, :lat, :lng)
		end
end
