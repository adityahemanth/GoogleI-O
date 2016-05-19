class CreatePlaces < ActiveRecord::Migration
  def change
    create_table :places do |t|

    	t.string :title
    	t.string :description
    	t.integer :lat
    	t.integer :lng

      t.timestamps null: false
    end
  end
end
