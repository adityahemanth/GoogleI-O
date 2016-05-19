class PhotoLike < ActiveRecord::Base

	belongs_to :user
	belongs_to :liked_photos, :class_name => "Photo"

end
