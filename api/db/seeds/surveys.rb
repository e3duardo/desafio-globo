module Seeds
  class Surveys
    def create
      survey = Survey.find_or_create_by(date: Time.zone.today) do |survey|
        survey.status = 'active'
      end

      survey.brothers = Brother.where(name: brother_list)
    end

    private
  
    def brother_list
      ['Douglas Silva', 'Eliezer', 'Laís']
    end
  end
end
