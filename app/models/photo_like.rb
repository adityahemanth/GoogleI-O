class PhotoLike < ActiveRecord::Base

	belongs_to :user
	belogns_to :liked_photos, :class_name => "Photo"
end
