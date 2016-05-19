class CreatePhotos < ActiveRecord::Migration
  def change
    create_table :photos do |t|

    	t.string :url
    	t.references :user

    	t.string :title, default: ""
    	t.text   :description, default: ""

      t.timestamps null: false
    end
  end
end
