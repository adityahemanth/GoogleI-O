class PlacesController < ApplicationController

	
	def show
		@place = Place.where(:title => params[:title])
		render :json => @place
	end

	def index
		#@user = current_user
		@places = Place.all

		render :json => @places
	end

	def within
	end

	def create


	end

	def new
	end

	def edit
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
