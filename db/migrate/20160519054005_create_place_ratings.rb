class CreatePlaceRatings < ActiveRecord::Migration
  def change
    create_table :place_ratings do |t|

      t.timestamps null: false
    end
  end
end
