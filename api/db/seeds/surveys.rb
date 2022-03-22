module Seeds
  class Surveys
    def create
      survey = Survey.create({
        date:Time.zone.today,
        status: 'active'
      })

      survey.brothers << Brother.where(name: brother_list)
    end
  end

  private

  def brother_list
    ['Douglas Silva', 'Eliezer', 'Laís']
  end
end
