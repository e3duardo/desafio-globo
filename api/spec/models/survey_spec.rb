describe Survey, type: :model do
  describe 'associations' do
    it { is_expected.to belong_to(:brother_out).class_name('Brother').optional }
    it { is_expected.to have_and_belong_to_many(:brothers) }
  end

  describe 'validations' do
    it { 
      is_expected.to define_enum_for(:status).with_values(
        created: 'created', active: 'active', done: 'done'
      ).backed_by_column_of_type(:string)
    }
    it { is_expected.to validate_presence_of(:date) }
    it { is_expected.to validate_uniqueness_of(:date) }
  end
end
