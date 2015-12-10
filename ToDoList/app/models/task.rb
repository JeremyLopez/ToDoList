class Task < ActiveRecord::Base
	has_many :comments
	
	def as_json(options = {})
		super(options.merge(indclude: :comments))
	end
end
