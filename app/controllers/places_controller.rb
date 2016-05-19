class PlacesController < ApplicationController

	
	def show
		@place = Place.where(:id => params[:id])
		render :json => @place
	end

	def index
		#@user = current_user
		@places = Place.all
		render :json => @places
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
		render :json => photos
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
