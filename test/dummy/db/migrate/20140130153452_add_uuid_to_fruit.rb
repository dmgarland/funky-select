class AddUuidToFruit < ActiveRecord::Migration
  def change
    add_column :fruits, :uuid, :string
  end
end
